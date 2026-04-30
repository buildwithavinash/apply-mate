import { Job } from "../models/Job.js";

const allowedJobFields = ["companyName", "jobRole", "status", "date", "jobLink", "notes"];

const pickJobFields = (body) => {
    return allowedJobFields.reduce((fields, key) => {
        if(body[key] !== undefined){
            fields[key] = body[key];
        }

        return fields;
    }, {});
};

const validateJobInput = ({ companyName, jobRole }) => {
    if(!companyName?.trim() || !jobRole?.trim()){
        return "Company name and job role are required";
    }

    return null;
};

export const createJob = async (req, res) => {
    try {
        const jobData = pickJobFields(req.body);
        const validationError = validateJobInput(jobData);

        if(validationError){
            return res.status(400).json({ message: validationError });
        }

        const job = await Job.create({
            ...jobData,
            user: req.user._id
        });
        res.status(201).json(job);
    }catch(err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({user: req.user._id}).sort({createdAt: -1});
        res.status(200).json(jobs);
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

export const updateJob = async (req, res) => {
    try {
        const jobData = pickJobFields(req.body);
        const validationError = validateJobInput(jobData);

        if(validationError){
            return res.status(400).json({ message: validationError });
        }

        const updatedJob = await Job.findOneAndUpdate(
            {_id: req.params.id, user: req.user._id},
            jobData,
            {new: true, runValidators: true}
        );

        if(!updatedJob){
            return res.status(404).json({ message: "Job not found" });
        }
        
        res.status(200).json(updatedJob);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findOneAndDelete({_id: req.params.id, user: req.user._id});

    if(!deletedJob){
        return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
