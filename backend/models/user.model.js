import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type:Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        required:true
    },
    profile:{
        bio:{
            type: String,
            default: "This is my bio"
        },
        skills:[{type: String}],
        resume:{type: String},
        resumeOriginalName:{type: String},
        company:{type:mongoose.Schema.Types.ObjectId, ref: "Company"},
        profilePhoto:{
            type: String,
            default:""
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
