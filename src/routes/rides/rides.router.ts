import { Response, Router } from 'express';
import bodyParser from 'body-parser';
const router = Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req: any, res: Response) => {
	const db = req.db;
	const startLatitude = Number(req.body.startLat);
	const startLongitude = Number(req.body.startLong);
	const endLatitude = Number(req.body.endLat);
	const endLongitude = Number(req.body.endLong);
	const riderName = req.body.riderName;
	const driverName = req.body.driverName;
	const driverVehicle = req.body.driverVehicle;
	if (
		startLatitude < -90 ||
  startLatitude > 90 ||
  startLongitude < -180 ||
  startLongitude > 180
	) {
		return res.send({
			error_code: 'VALIDATION_ERROR',
			message:
    'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
		});
	}

	if (
		endLatitude < -90 ||
  endLatitude > 90 ||
  endLongitude < -180 ||
  endLongitude > 180
	) {
		return res.send({
			error_code: 'VALIDATION_ERROR',
			message:
    'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
		});
	}

	if (typeof riderName !== 'string' || riderName.length < 1) {
		return res.send({
			error_code: 'VALIDATION_ERROR',
			message: 'Rider name must be a non empty string',
		});
	}

	if (typeof driverName !== 'string' || driverName.length < 1) {
		return res.send({
			error_code: 'VALIDATION_ERROR',
			message: 'Rider name must be a non empty string',
		});
	}

	if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
		return res.send({
			error_code: 'VALIDATION_ERROR',
			message: 'Rider name must be a non empty string',
		});
	}

	const values = [
		startLongitude,
		startLongitude,
		endLatitude,
		endLongitude,
		riderName,
		driverName,
		driverVehicle,
	];

	db.run(
		'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
		values,
		function (this: any, err: any, row: any) {
			console.log({ err, row });
			if (err) {
				return res.send({
					error_code: 'SERVER_ERROR',
					message: 'Unknown error',
				});
			}

			db.all(
				'SELECT * FROM Rides WHERE rideID = ?',
				this.lastID,
				function (err: any, rows: any[]) {
					if (err) {
						return res.send({
							error_code: 'SERVER_ERROR',
							message: 'Unknown error',
						});
					}

					res.send(rows);
				}
			);
		}
	);
});

router.get('/', (req: any, res: Response) => {
	const page = req.query.page || 1;
	const limit = req.query.limit || 30;
	const db = req.db;
	const offset = (page - 1) * limit;
	db.all(
		`SELECT * FROM Rides LIMIT ${limit} OFFSET ${offset}`,
		function (err: any, rows: any[]) {
			if (err) {
				return res.send({
					error_code: 'SERVER_ERROR',
					message: 'Unknown error',
				});
			}

			if (rows.length === 0) {
				return res.send({
					error_code: 'RIDES_NOT_FOUND_ERROR',
					message: 'Could not find any rides',
				});
			}

			res.send(rows);
		}
	);
});

router.get('/:id', (req: any, res: Response) => {
	const db = req.db;
	console.log({id: req.params.id});
	db.all(
		`SELECT * FROM Rides WHERE rideID='${req.params.id}'`,
		function (err: any, rows: any[]) {
			if (err) {
				return res.send({
					error_code: 'SERVER_ERROR',
					message: 'Unknown error',
				});
			}

			if (rows.length === 0) {
				return res.send({
					error_code: 'RIDES_NOT_FOUND_ERROR',
					message: 'Could not find any rides',
				});
			}

			res.send(rows);
		}
	);
});

export default router;
