import { NextFunction, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { createRideValidation } from './rides.validation';
import { AsyncDB } from '../../db/async-db';
const router = Router();
const jsonParser = bodyParser.json();

router.post(
	'/',
	jsonParser,
	createRideValidation,
	async (req: any, res: Response, next: NextFunction) => {
		try {
			const asyncDB = new AsyncDB(req.db);
			let { startLat, startLong, endLat, endLong } = req.body;
			const { riderName, driverName, driverVehicle } = req.body;
			startLat = startLat ? Number(startLat) : 0;
			startLong = startLong ? Number(startLong) : 0;
			endLat = endLat ? Number(endLat) : 0;
			endLong = endLong ? Number(endLong) : 0;

			const row: any = await asyncDB.run(
				'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
				[
					startLat,
					startLong,
					endLat,
					endLong,
					riderName,
					driverName,
					driverVehicle,
				]
			);

			const rows = await asyncDB.all(
				'SELECT * FROM Rides WHERE rideID = ?',
				row.lastID
			);
			res.send(rows);
		} catch (error) {
			next(error);
		}
	}
);

router.get('/', async (req: any, res: Response, next: NextFunction) => {
	try {
		const asyncDB = new AsyncDB(req.db);
		const page = req.query.page || 1;
		const limit = req.query.limit || 30;
		const offset = (page - 1) * limit;
		const rows = await asyncDB.all('SELECT * FROM Rides LIMIT ? OFFSET ?', [
			limit,
			offset,
		]);
		res.send(rows);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req: any, res: Response, next: NextFunction) => {
	try {
		const asyncDB = new AsyncDB(req.db);
		const rows = await asyncDB.all(
			'SELECT * FROM Rides WHERE rideID= ?',
			req.params.id
		);

		res.send(rows);
	} catch (error) {
		next(error);
	}
});

export default router;
