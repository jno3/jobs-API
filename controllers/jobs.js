import { StatusCodes } from "http-status-codes";
import Job from '../models/Job.js';
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllJobs = async (req, res) => {
    const userId = req.user.userId;
    const jobs = await Job.find({ createdBy: userId }).sort('createdAt');
    return res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

export const getJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { userId } = req.user;

    const job = await Job.findOne({
        _id: (jobId),
        createdBy: (userId)
    });

    if (!job) {
        throw new NotFoundError('job was not found');
    }

    res.status(StatusCodes.OK).json(job);
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.CREATED).json({ job });
}

export const updateJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { userId } = req.user;
    const { company, position } = req.body;

    if (company === '' && position === '') {
        throw new BadRequestError('company and position cannot be empty');
    }

    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId},
        {...req.body},
        {new: true}
    );

    if(!job){
        throw new NotFoundError('job was not found');
    }

    res.status(StatusCodes.OK).json(job);
}

export const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { userId } = req.user;

    const job = await Job.findOneAndRemove(
        { _id: jobId, createdBy: userId}
    );

    if(!job){
        throw new NotFoundError('job was not found');
    }

    res.status(StatusCodes.OK).send('the job was removed');
}