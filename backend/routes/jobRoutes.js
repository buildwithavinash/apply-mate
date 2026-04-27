import express from 'express';
import { createJob, deleteJob, getJobs, updateJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

// Post /api/jobs
router.post('/', protect, createJob);

// GET
router.get('/', protect, getJobs);

// PUT
router.put('/:id', protect, updateJob);

// DELETE
router.delete('/:id', protect, deleteJob);


export default router;

