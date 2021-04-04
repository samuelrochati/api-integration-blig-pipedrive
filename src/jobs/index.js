const PipedriveJob = require('./PipedriveJob');

const jobs = async () => {
  PipedriveJob.execute();
};

module.exports = { jobs };
