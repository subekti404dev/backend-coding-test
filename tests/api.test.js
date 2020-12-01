'use strict';

const request = require('supertest');
const { serializedDB } = require('../src/db/serialized-db')
let app;


describe('API tests', () => {
    before((done) => {
        serializedDB().then((db) => {
            app = require('../src/app')(db);
            done()
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
});