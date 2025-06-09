import { application } from "express";
import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    requirements:[{type:String,required:true}],
    salary:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobtype:{
        type:String,
        required:true,
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    application:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }
},{
    timestamps:true
})

export const Job=mongoose.model("J0b",jobSchema);