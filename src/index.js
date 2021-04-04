const app = require('./server');
const logger = require('./shared/logger');

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  logger.info('O pai ta ON 🚀🚀🚀', {
    timestamp: new Date().toString(),
  });
});
