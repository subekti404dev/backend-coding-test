import { Response, NextFunction } from 'express';
import { ValidationError } from '../../errors/custom-error';



const isValidLatLong = (lat: number, long: number) => {
	const invalid = lat < -90 || lat > 90 || long < -180 || long > 180;
	return !invalid;
};

const isNonEmptyString = (str: string) => {
	const empty = typeof str !== 'string' || str.length < 1;
	return !empty;
};

const createRideValidation = (req: any, res: Response, next: NextFunction) => {
	try {
		
		let { startLat, startLong, endLat, endLong } = req.body;
		const { riderName, driverName, driverVehicle } = req.body;
		startLat = startLat ? Number(startLat) : 0;
		startLong = startLong ? Number(startLong) : 0;
		endLat = endLat ? Number(endLat) : 0;
		endLong = endLong ? Number(endLong) : 0;
  
		if (!isValidLatLong(startLat, startLong)) {
			throw new ValidationError(
				'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
			);
		}

		if (!isValidLatLong(endLat, endLong)) {
			throw new ValidationError(
				'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
			);
		}

		if (!isNonEmptyString(riderName)) {
			throw new ValidationError('Rider name must be a non empty string');
		}

		if (!isNonEmptyString(driverName)) {
			throw new ValidationError('Driver name must be a non empty string');
		}

		if (!isNonEmptyString(driverVehicle)) {
			throw new ValidationError('Driver vehicle must be a non empty string');
		}

		next();
	} catch (error) {
		next(error);
	}
};

export { createRideValidation };
