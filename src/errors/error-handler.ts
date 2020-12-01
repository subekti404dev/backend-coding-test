import express from 'express';

export const errorHandler = (
	err: any,
	req: express.Request,
	res: express.Response,
) => {
	res.status(err.code || 500);
	res.send({
		error_code: err.name || 'SERVER_ERROR',
		message: err.message || 'Unknown Error',
	});
};
