const dotenv = require('dotenv');

const qs = require('query-string');
const Api = require('../config/bling');

const logger = require('../shared/logger');

class BlingService {
  constructor(path) {
    this.envs = dotenv.config().parsed;
    this.path = path;
  }

  async post(obj = {}) {
    try {
      const queryGenerator = qs.stringify({
        apikey: this.envs.BLING_KEY,
        ...obj,
      });

      const response = await Api.post(
        `${this.envs.BLING_URL}/${this.path}?${queryGenerator}`
      );

      return response.data;
    } catch (error) {
      logger.error(`BLING ${error.message}`, {
        timestamp: new Date().toString(),
      });
    }
  }
}

module.exports = BlingService;
