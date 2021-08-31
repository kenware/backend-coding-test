'use strict';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import RideController from './controller/ride';
const app = express();

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();


const appModule = (db) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.use('/swagger-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.post('/rides', jsonParser, async (req, res) => {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Drider name must be a non empty string'
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Drider vehicle name must be a non empty string'
            });
        }

        var values = [startLatitude, startLongitude, endLatitude, endLongitude, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
        
        const result = await db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values)

        const response = await db.all('SELECT * FROM Rides WHERE rideID = ?', result.lastID)

        return res.json(response);
    });

    app.get('/rides', (req, res) => RideController.getRide(req, res, db))

    app.get('/rides/:id', (req, res) => {
        db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }

            res.send(rows);
        });
    });

    return app;
};

export default appModule;