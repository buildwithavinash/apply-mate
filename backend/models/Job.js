import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    companyName: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['applied', "interviewing", "rejected", "offer"],
        default: 'applied'
    },
    date: {
        type: String
    },
    jobLink: {
        type: String
    },
    notes: {
        type: String
    },
},
 {timestamps: true} 
)

export const Job = mongoose.model('Job', jobSchema)