export class AsyncDB {
 private _db: any;
 constructor(db: any) {
 	this._db = db;
 }

 public async run(query: string, data: any) {
 	return new Promise((resolve, reject) => {
 		this._db.run(query, data, function (this: any, err: any) {
 			if (err) {
 				reject(err);
 			} else {
 				resolve(this);
 			}
 		});
 	});
 }

 public async all(query: string, data: any) {
 	return new Promise((resolve, reject) => {
 		this._db.all(query, data, (err: any, rows: any[]) => {
 			if (err) {
 				reject(err);
 			} else {
 				resolve(rows);
 			}
 		});
 	});
 }
}
