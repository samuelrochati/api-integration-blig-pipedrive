const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const swaggerDocument = require('../docs/swagger.json');

const { jobs } = require('./jobs');
const { handleError, ErrorHandler } = require('./shared/error');
const httpStatusCodes = require('./shared/httpStatusCodes');
const httpLogger = require('./shared/httpLogger');

require('dotenv').config();
require('./database');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const app = express();

app.use(limiter);
app.use(compression());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(httpLogger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', routes);

// jobs
jobs();

// eslint-disable-next-line no-unused-vars
app.use((request, response, next) => {
  throw new ErrorHandler(
    httpStatusCodes.NOT_FOUND,
    `🔍 - Not Found - ${request.originalUrl}`
  );
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  handleError(error, response);
});

module.exports = app;
