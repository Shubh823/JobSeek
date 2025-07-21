import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import supabase from "../utils/supabaseClient.js";
import { getSkillsFromResume } from "../utils/geminiHelper.js";
import {smartSearch} from "../utils/geminiSmartSearch.js"

import fs from 'fs';

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate({ path: "applications" })
            .populate({ path: "company" });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// Get recommended jobs based on resume using Gemini API
export const getRecommendedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        // Check for resume URL
        const resumeUrl = user.profile?.resume;
        if (!resumeUrl) {
            // Fallback: no resume, show recent jobs
            const recentJobs = await Job.find().populate("company").sort({ createdAt: -1 }).limit(10);
            return res.status(200).json({
                jobs: recentJobs,
                success: true,
                message: "No resume found. Showing recent jobs instead."
            });
        }
        // Extract the path from the public URL (Supabase)
        // Example: https://.../object/public/resumes/resume-123.pdf => resumes/resume-123.pdf
        const match = resumeUrl.match(/object\/public\/(.*)/);
        const resumePath = match ? match[1] : null;
        if (!resumePath) {
            return res.status(400).json({ message: "Invalid resume URL", success: false });
        }
        // Download resume from Supabase
        const { data, error } = await supabase.storage.from('resumes').download(resumePath.replace('resumes/', ''));
        if (error || !data) {
            return res.status(400).json({ message: "Failed to download resume", success: false });
        }
        // Parse PDF text
        const buffer = await data.arrayBuffer();
        const pdfText = await pdfParse(Buffer.from(buffer));
        // Get skills/roles from Gemini
        const text = await getSkillsFromResume(pdfText.text);
        const {skills,roles,technology} =text;
       

        const combinedKeywords = [...skills, ...technology, ...roles].map(term =>
            term.toLowerCase()
          );
        // Find jobs matching skills or roles
        const recommendedJobs = await Job.find({
            $and: [
              {
                $or: [
                  { requirements: { $in: combinedKeywords } },
                  { title: { $regex: combinedKeywords.join('|'), $options: 'i' } },
                  { description: { $regex: combinedKeywords.join('|'), $options: 'i' } }
                ]
              },
            ]
          }).populate('company').sort({ createdAt: -1 });
        // Fallback: recent jobs
        if (!recommendedJobs.length) {
            const recentJobs = await Job.find().populate('company').sort({ createdAt: -1 }).limit(10);
            return res.status(200).json({
                jobs: recentJobs,
                success: true,
                message: "No direct matches. Showing recent jobs instead."
            });
        }
        return res.status(200).json({
            jobs: recommendedJobs,
            success: true,
            message: `Recommended jobs using your resume`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error processing resume recommendation",
            success: false
        });
    }
}

export const updateJob=async(req,res)=>{
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experienceLevel,
            position,
            companyId
        } = req.body;

        // Build updateData object only with provided fields
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (requirements) updateData.requirements = Array.isArray(requirements) ? requirements : requirements.split(",");
        if (salary) updateData.salary = Number(salary);
        if (location) updateData.location = location;
        if (jobType) updateData.jobType = jobType;
        if (experienceLevel) updateData.experienceLevel = experienceLevel;
        if (position) updateData.position = position;
        if (companyId) updateData.company = companyId;

        const job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Job information updated.",
            job,
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating job.",
            success: false
        });
    }
}

export const searchedJobs=async (req,res)=>{
    const { query } = req.body;
    console.log("Search query:", query);
    
    try {
        let queryArray=await smartSearch(query);
        
        const searchConditions = queryArray.flatMap((keyword) => [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { requirements: { $regex: keyword, $options: "i" } },
            { jobType: { $regex: keyword, $options: "i" } },
            { location: { $regex: keyword, $options: "i" } },
          ]);

          const jobs = await Job.find({ $or: searchConditions }).populate('company').sort({ createdAt: -1 });
          if(!jobs){
             return res.status(404).json({jobs,message:"no job found",success:true});
          }

          return res.status(200).json({jobs,message:"job based on the search query.",success:true});

    } catch (error) {
        console.log("error in the smart seach route:",error);
        return res.status(400).json({message:"error searching the jobs",success:false})
    }

}

