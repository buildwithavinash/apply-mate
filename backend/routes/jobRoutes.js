import express from 'express';
import { createJob, deleteJob, getJobs, updateJob } from '../controllers/jobController.js';

const router = express.Router();

// Post /api/jobs
router.post('/', createJob);

// GET
router.get('/', getJobs);

// PUT
router.put('/:id', updateJob);

// DELETE
router.delete('/:id', deleteJob);


export default router;

