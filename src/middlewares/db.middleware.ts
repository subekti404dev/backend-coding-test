export default (db: any) => {
	return (req: any, res: any, next: any) => {
		req.db = db;
		next();
	};
};
