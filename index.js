'use strict';

const port = process.env.PORT || 8010;
const { serializedDB } = require('./src/db/serialized-db')

serializedDB().then((db) => {
    const app = require('./src/app')(db);
    app.listen(port, () => console.log(`App started and listening on port ${port}`));
});