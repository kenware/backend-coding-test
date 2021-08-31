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

    app.post('/rides', jsonParser, async (req, res) => RideController.createRide(req, res, db));

    app.get('/rides', (req, res) => RideController.getRides(req, res, db));

    app.get('/rides/:id', (req, res) => RideController.getRideById(req, res, db));
    return app;
};

export default appModule;