const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Empatkali API Documentation',
      version: '1.0.0'
    }
  },
  apis: [
    './src/routes/health/health.swagger.js',
    './src/routes/rides/rides.swagger.js',
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;