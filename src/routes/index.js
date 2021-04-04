const { Router } = require('express');

const consolidadoController = require('../api/controllers/consolidados.controller');

const routes = Router();

routes.use('/consolidado', consolidadoController.index);

module.exports = routes;
