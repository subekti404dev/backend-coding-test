import sqlite3 from 'sqlite3';
import buildSchemas from './schemas';
const sqlite3Verbose = sqlite3.verbose();
const db = new sqlite3Verbose.Database(':memory:');

const serializedDB = async () => {
	return new Promise((resolve) => {
		buildSchemas(db);
		db.serialize(() => {
			resolve(db);
		});
	});
};

export { serializedDB };
