import express from 'express';
import { createJob, getJobs } from '../controllers/jobController.js';

const router = express.Router();

// Post /api/jobs
router.post('/', createJob);

// GET
router.get('/', getJobs);

export default router;

