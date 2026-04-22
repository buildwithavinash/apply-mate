import { Job } from "../models/Job.js";

export const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    }catch(err) {
        res.status(500).json({
            message: err.message,
        })
    }
}