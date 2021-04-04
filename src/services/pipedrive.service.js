const dotenv = require('dotenv');
const qs = require('query-string');
const logger = require('../shared/logger');

const Api = require('../config/pipedrive');

class PipedriveService {
  constructor(path) {
    this.envs = dotenv.config().parsed;
    this.path = path;
  }

  async get(obj = {}) {
    try {
      const queryGenerator = qs.stringify({
        api_token: this.envs.PIPEDRIVE_KEY,
        ...obj,
      });
      const response = await Api.get(
        `${this.envs.PIPEDRIVE_URL}/${this.path}?${queryGenerator}`
      );

      return response.data.success
        ? response.data.data.map(({ id, title, value, won_time }) => ({
            vlr: value,
            vlr_unit: value,
            qtde: 1,
            descricao: title,
            servico: title,
            nome: title,
            cliente: title,
            pedido: id,
            data: new Date(won_time),
          }))
        : logger.error('PIPEDRIVE error na requisição', {
            timestamp: new Date().toString(),
          });
    } catch (error) {
      logger.error(`PIPEDRIVE ${error.message}`, {
        timestamp: new Date().toString(),
      });
    }
  }
}

module.exports = PipedriveService;
