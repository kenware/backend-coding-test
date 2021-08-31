import { Request, Response } from 'express';
import BaseController from './base';
import logger from '../utils/logger';

export default class Ride extends BaseController{
   /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   */
  static async getRides(req: Request, res: Response, db: any): Promise<any> {
    try{
        let { limit, page }: any = req.params
        limit = limit || 10;
        page = page || 1;
        limit = Number(limit);
        page = Number(page);
        const offset = (page -1) * limit;
        const rides = await db.all('SELECT * FROM Rides LIMIT ? OFFSET ?', [limit, offset]);

        if (!rides || rides.length === 0) {
            return Ride.errorHandler(
                req, res,
                'Could not find any rides',
                'RIDES_NOT_FOUND_ERROR',
                200
            );
        }
        const totalCount = await db.all('SELECT count(startLat) as count FROM Rides');
        return Ride.successHandler(req, res, {totalCount: totalCount[0].count, results: rides}, 200)
    }catch(err) {
        logger.info(err.message)
        return Ride.errorHandler(
            req, res,
            'Unknown error',
            'SERVER_ERROR',
            200
        );
    }
  }

  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   */
    static async createRide(req: Request, res: Response, db: any): Promise<any> {
      try {

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
  
          const values = [startLatitude, startLongitude, endLatitude, endLongitude, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
          
          const result = await db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);
  
          const response = await db.all('SELECT * FROM Rides WHERE rideID = ?', result.lastID);
  
          return Ride.successHandler(req, res, response, 200);

      }catch(err) {
        return Ride.errorHandler(
          req, res,
          'Unknown error',
          'SERVER_ERROR',
          200);
      }

    }

   /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   */
    static async getRideById(req: Request, res: Response, db: any): Promise<any> {
      try {
          const ride = await db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`)
          if (ride && ride.length === 0) {
              return Ride.errorHandler(
                  req, res,
                  'Could not find any ride',
                  'RIDES_NOT_FOUND_ERROR',
                  200
              );
          }
      return Ride.successHandler(req, res, ride, 200);
      }catch(err) {
          return Ride.errorHandler(
              req, res,
              'Unknown error',
              'SERVER_ERROR',
              200
          );
      }
    }
}
