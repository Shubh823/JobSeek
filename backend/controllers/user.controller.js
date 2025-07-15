import { User }  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import  supabase  from "../utils/supabaseClient.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Profile photo is required",
                success: false
            });
        }
        const fileUri = getDataUri(file);
         const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "auto"
          });
          

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const userId = req.id; // middleware authentication

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }
        
          
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }

        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...

        const file = req.file;
        if (file) {
            const fileExt = file.originalname.split('.').pop();
            const fileName = `resume-${Date.now()}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;
            ;

            const { error } = await supabase
                .storage
                .from('resumes')
                .upload(filePath, file.buffer, {
                    contentType:file.mimetype
                });

            if (error) {
                console.error("Error uploading resume:", error);
                return res.status(500).json({ message: "Failed to upload resume.", success: false });
            }

            const { data: publicUrlData } = supabase
                .storage
                .from('resumes')
                .getPublicUrl(filePath);

            if (publicUrlData?.publicUrl) {
                user.profile.resume = publicUrlData.publicUrl;
                user.profile.resumeOriginalName = file.originalname;
            }
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const saveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Check if job is already saved
        if (user.savedJobs.includes(jobId)) {
            return res.status(400).json({
                message: "Job is already saved",
                success: false
            });
        }

        // Add job to saved jobs
        user.savedJobs.push(jobId);
        await user.save();

        return res.status(200).json({
            message: "Job saved successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error saving job",
            success: false
        });
    }
}

export const unsaveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Remove job from saved jobs
        user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        await user.save();

        return res.status(200).json({
            message: "Job removed from saved jobs",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error removing job",
            success: false
        });
    }
}

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        console.log('getSavedJobs called with userId:', userId);

        const user = await User.findById(userId).populate({
            path: 'savedJobs',
            populate: {
                path: 'company'
            }
        });

        console.log('User found:', user ? 'Yes' : 'No');
        console.log('Saved jobs:', user?.savedJobs);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            savedJobs: user.savedJobs,
            success: true
        });
    } catch (error) {
        console.log('Error in getSavedJobs:', error);
        return res.status(500).json({
            message: "Error fetching saved jobs",
            success: false
        });
    }
}

