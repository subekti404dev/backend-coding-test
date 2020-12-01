'use strict';

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./app.swagger');
const healthRouter = require('./routes/health/health.router');
const ridesRouter = require('./routes/rides/rides.router');
const dbMiddleware = require('./middlewares/db.middleware');

module.exports = (db) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/health', healthRouter);
    app.use('/rides', dbMiddleware(db), ridesRouter);
    return app;
};
