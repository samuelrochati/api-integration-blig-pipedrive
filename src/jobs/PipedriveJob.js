const cron = require('node-cron');
const { EventEmitter } = require('events');
const PipedriveService = require('../services/pipedrive.service');
const Opportunity = require('../api/schemas/Opportunity');
const logger = require('../shared/logger');
const Convert = require('../shared/convert');
const BlingService = require('../services/bling.service');

const blingEvents = new EventEmitter();

class PipedriveJob {
  constructor() {
    blingEvents.on('newOpportunities', this.taskUploadBling);
  }

  execute() {
    cron.schedule(
      '*/1 * * * *',
      async () => {
        this.task();
      },
      {
        scheduled: true,
        timezone: 'America/Sao_Paulo',
      }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async task() {
    try {
      const pipedriveService = new PipedriveService('deals');

      const oportunities = await pipedriveService.get({ status: 'won' });

      oportunities.forEach(async (opportunity) => {
        const query = { pedido: opportunity.pedido };
        const update = {
          $setOnInsert: { ...opportunity, wasuploaded: false },
        };
        const options = { upsert: true };

        await Opportunity.findOneAndUpdate(query, update, options);
      });

      const verify = await Opportunity.find({
        wasuploaded: false,
      }).select({
        pedido: 1,
        cliente: 1,
        data: 1,
        descricao: 1,
        nome: 1,
        qtde: 1,
        servico: 1,
        vlr: 1,
        vlr_unit: 1,
      });

      if (verify.length < 1) {
        logger.info(`🗣  ${verify.length} new opportunities found`, {
          timestamp: new Date().toString(),
        });
        return;
      }

      logger.info(
        `🗣  Eureka! Eureka! ${verify.length} new opportunities found`,
        {
          timestamp: new Date().toString(),
        }
      );
      blingEvents.emit('newOpportunities');
    } catch (error) {
      logger.error(`PIPEDRIVE ${error.message}`, {
        timestamp: new Date().toString(),
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async taskUploadBling() {
    try {
      const oportunities = await Opportunity.find({
        wasuploaded: false,
      }).select({
        pedido: 1,
        cliente: 1,
        data: 1,
        descricao: 1,
        nome: 1,
        qtde: 1,
        servico: 1,
        vlr: 1,
        vlr_unit: 1,
      });

      logger.info(
        `✅ Uploading ${oportunities.length} new opportunities for BLING`,
        {
          timestamp: new Date().toString(),
        }
      );

      if (oportunities.length < 1) return;

      const arrConvert = await new Convert(oportunities).jsonToxml();
      const blingService = new BlingService('pedido/json/');

      arrConvert.forEach(async (pedidoXml) => {
        await blingService.post({ xml: pedidoXml });
      });

      await Opportunity.updateMany(
        { wasuploaded: false },
        { $set: { wasuploaded: true } }
      );
    } catch (error) {
      logger.error(`BLING ${error.message}`, {
        timestamp: new Date().toString(),
      });
    }
  }
}

module.exports = new PipedriveJob();
