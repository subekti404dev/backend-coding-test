import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './app.swagger';
import healthRouter from './routes/health/health.router';
import ridesRouter from './routes/rides/rides.router';
import dbMiddleware from './middlewares/db.middleware';
const app = express();

const myApp = (db: any) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.use('/health', healthRouter);
	app.use('/rides', dbMiddleware(db), ridesRouter);
	return app;
};

export default myApp;
