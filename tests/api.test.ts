'use strict';

import request from 'supertest';

import sqlite3 from 'sqlite3'
sqlite3.verbose();
const db = new sqlite3.Database(':memory:');

import server from '../src/app';
const app = server(db);
import buildSchemas from '../src/schemas';

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
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