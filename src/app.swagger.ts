import swaggerJSDoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Empatkali API Documentation',
			version: '1.0.0'
		}
	},
	apis: [
		'./src/routes/health/health.swagger.ts',
		'./src/routes/rides/rides.swagger.ts',
	]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;