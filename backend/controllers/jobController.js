import { Job } from "../models/Job.js";

export const createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
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
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        
        res.status(200).json(updatedJob);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};