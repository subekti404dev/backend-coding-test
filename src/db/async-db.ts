import SqlString from 'sqlstring';
export class AsyncDB {
 private _db: any;
 constructor(db: any) {
 	this._db = db;
 }

 public async run(query: string, data: any[]) {
 	// escaping query value first to prevent sql injection
 	data = this.escape(data);

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

 public async all(query: string, data: any[]) {
	 // escaping query value first to prevent sql injection
 	data = this.escape(data);

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

 private escape(data: any[]) {
 	const escape = (str: any) => {
 		if (typeof(str) === 'string') return SqlString.escape(str);
 		return str;
 	};
 	if (Array.isArray(data)){
 		return data.map(d => {
 			return escape(d);
 		});
 	} else {
 		return escape(data);
 	}
 }
}
