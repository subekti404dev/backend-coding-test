const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const buildSchemas = require('./schemas');

const serializedDB = async () => {
  return new Promise((resolve) => {
    buildSchemas(db);
    db.serialize(() => {
      resolve(db)
    })
  })
}

module.exports = {serializedDB}