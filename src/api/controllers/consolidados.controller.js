const httpStatusCodes = require('../../shared/httpStatusCodes');
const Opportunity = require('../schemas/Opportunity');

module.exports = {
  async index(request, response, next) {
    try {
      const consolidado = await Opportunity.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$data' } },
            totalAmount: { $sum: '$vlr' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: 1 } },
      ]);

      response.json({
        status: 'success',
        statusCode: httpStatusCodes.OK,
        data: consolidado,
      });
    } catch (error) {
      next(error);
    }
  },
};
