'use strict';

import request from 'supertest';

import sqlite3 from 'sqlite3'
sqlite3.verbose();

import server from '../src/app';
import buildSchemas from '../src/schemas';
import { assert } from 'console';
import { goodData, badEndLatData, badStartLatData } from './mock';
import openDb from '../src/database';
let app;

describe('API tests', () => {
    before(async() => {
        const db = await openDb();
        app = server(db);
        buildSchemas(db);
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should not find any ride', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(function(res) {
                    console.log(res.body)
                    assert(res.body.error_code, 'RIDES_NOT_FOUND_ERROR');
                    assert(res.body.message, 'Could not find any rides');
                  })
                .expect(200, done);
        }).timeout(1000);
    });

    describe('POST /rides', () => {
        it('should create a ride', (done) => {
            request(app)
                .post('/rides')
                .send(goodData)
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(function(res, err) {
                    console.log(res.body)
                    assert(res.body[0].startLat, goodData.start_lat);
                    assert(res.body[0].endLat, goodData.end_lat);
                    assert(res.body[0].riderName, goodData.rider_name);
                    assert(res.body[0].driverName, goodData.driver_name);
                  })
                .expect(200, done);
        }).timeout(1000);;

        it('should fail to create a ride with bad start data', (done) => {
            request(app)
                .post('/rides')
                .send(badStartLatData)
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(function(res) {
                    const message = 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                    assert(res.body.error_code, 'VALIDATION_ERROR');
                    assert(res.body.message, message);
                  })
                .expect(200, done);
        });

        it('should fail to create a ride with bad location end data', (done) => {
            request(app)
                .post('/rides')
                .send(badEndLatData)
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(function(res) {
                    const message = 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                    assert(res.body.error_code, 'VALIDATION_ERROR');
                    assert(res.body.message, message);
                  })
                .expect(200, done);
        });

        it('should fail to create a ride without rider_name', (done) => {
            request(app)
                .post('/rides')
                .send({...goodData, rider_name: ''})
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(function(res) {
                    const message = 'Rider name must be a non empty string'
                    assert(res.body.error_code, 'VALIDATION_ERROR');
                    assert(res.body.message, message);
                  })
                .expect(200, done);
        }).timeout(10000);

        it('should fail to create a ride without driver_name', (done) => {
            request(app)
                .post('/rides')
                .send({...goodData, driver_name: ''})
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(function(res) {
                    const message = 'Drider name must be a non empty string'
                    assert(res.body.error_code, 'VALIDATION_ERROR');
                    assert(res.body.message, message);
                  })
                .expect(200, done);
        });

        it('should fail to create a ride without driver_vehicle', (done) => {
            request(app)
                .post('/rides')
                .send({...goodData, driver_vehicle: ''})
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(function(res) {
                    const message = 'Drider vehicle name must be a non empty string'
                    assert(res.body.error_code, 'VALIDATION_ERROR');
                    assert(res.body.message, message);
                  })
                .expect(200, done);
        });
    });


    describe('GET /rides', () => {
        it('should find any ride', (done) => {
            request(app)
                .get('/rides?page=1&limit=1')
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(function(res) {
                    assert(res.body.results[0].startLat, goodData.start_lat);
                    assert(res.body.results[0].endLat, goodData.end_lat);
                    assert(res.body.results[0].riderName, goodData.rider_name);
                    assert(res.body.results[0].driverName, goodData.driver_name);
                    assert(res.body.totalCount + '', '1');
                  })
                .expect(200, done);
        }).timeout(10000);
    });
});