import winston, { format } from 'winston';
const { combine, timestamp, prettyPrint } = format;
const logger = winston.createLogger({
	format: combine(timestamp(), prettyPrint()),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'logger.log' }),
	],
});

const loggerUtil = {
	log: (a: string) => {
		return logger.info(a);
	},
	error: (b: string) => {
		return logger.error(b);
	},
	info: (c: string) => {
		return logger.info(c);
	},
};

export { loggerUtil };
