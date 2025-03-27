const JobDescription = require('../models/JobDescription');

const createJob = async (jobData) => {
    const job = new JobDescription(jobData);
    await job.save();
    return job;
};

const getJobById = async (jobId) => {
    return await JobDescription.findById(jobId);
};

module.exports = { createJob, getJobById };
