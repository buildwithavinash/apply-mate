import express from 'express';
import { createJob } from '../controllers/jobController.js';

const router = express.Router();

// Post /api/jobs

router.post('/', createJob);

export default router;

