const port = process.env.PORT || 8010;
import { serializedDB } from './src/db/serialized-db';
import { loggerUtil } from './src/utils/logger.util';
import myApp from './src/app';

serializedDB().then((db: any) => {
	const app = myApp(db);
	app.listen(port, () =>
		loggerUtil.log(`App started and listening on port ${port}`)
	);
});
