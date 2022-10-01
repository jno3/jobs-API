import express from 'express';
const router = express.Router();
import {
    createJob,
    deleteJob,
    getAllJobs,
    getJob,
    updateJob
} from '../controllers/jobs.js';

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

export default router;