import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

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

// Get recommended jobs based on user skills
export const getRecommendedJobs = async (req, res) => {
    try {
        const userId = req.id;
        
        // Get user profile with skills
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        if (!user.profile || !user.profile.skills || user.profile.skills.length === 0) {
            // If no skills, return recent jobs
            const recentJobs = await Job.find().populate({
                path: "company"
            }).sort({ createdAt: -1 }).limit(10);
            
            return res.status(200).json({
                jobs: recentJobs,
                success: true,
                message: "Showing recent jobs (no skills found for recommendations)"
            });
        }

        const userSkills = user.profile.skills.map(skill => skill.toLowerCase());
        
        // Find jobs that match user skills
        const recommendedJobs = await Job.find({
            $or: [
                { title: { $regex: userSkills.join('|'), $options: "i" } },
                { description: { $regex: userSkills.join('|'), $options: "i" } },
                { requirements: { $in: userSkills.map(skill => new RegExp(skill, 'i')) } }
            ]
        }).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        // If no direct matches, find jobs with similar requirements
        if (recommendedJobs.length === 0) {
            const fallbackJobs = await Job.find().populate({
                path: "company"
            }).sort({ createdAt: -1 }).limit(10);
            
            return res.status(200).json({
                jobs: fallbackJobs,
                success: true,
                message: "Showing recent jobs (no direct skill matches found)"
            });
        }

        return res.status(200).json({
            jobs: recommendedJobs,
            success: true,
            message: `Found ${recommendedJobs.length} jobs matching your skills`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching recommended jobs",
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