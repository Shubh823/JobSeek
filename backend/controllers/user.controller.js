import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async (requestAnimationFrame,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Some fields are missing",
                success:false,
            });
        }

            const user=await User.findOne({email});
            if(user){
                return res.status(400).json({
                    message:"User already exits with this email",
                    success:false
                });
            }

            const hashedPassword=await bcrypt.hash(password,10);
            await User.create({
                fullname,
                email,
                phoneNumber,
                password:hashedPassword,
                role,
            })

            return res.status(200).json({
                message:"Account created successfully.",
                success:true
            })
        
    } catch (error) {
        console.log(error)
    }
}

export const login=async (req,res)=>{
    try {
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        let user=await User.find({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect emailor password.",
                success:false
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or password.",
                success:false
            })
        }

        if(role!== user.role){
            return res.status(400).json({
                message:"Account dose not exixt with this role.",
                success:false
            })
        }

        const tokenData={
            userId:user._id,
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            scuccess:true
        });



    } catch (error) {
        console.log(error)
    }
}

export const logout=async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile= async (req,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role}=req.body;
        const file =req.file;

        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message:"Some fields are missing",
                success:false,
            });
        };
        //cloudinary file 

        let skillsArray;
        if(skills){
            skillsArray=skills.split(","); 
        }
        
        const userId=req.id;
        let user=await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        if(fullname) user.fullname=fullname
        if(email)  user.email=email
        if(phoneNumber)  user.phoneNumber=phoneNumber
        if(bio)  user.profile.bio=bio
        if(skills)  user.profile.skills=skillsArray
        
        
        
        
        

        //resume comes later 

        await user.save();
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
      return res.status(200).json({
        message:"Profile updated successfully.",
        user,
        success:true
      })
    } catch (error) {
        console.log(error)
    }
}