
import { Request, Response } from 'express';
import BaseController from './base';
import logger from '../utils/logger';

export default class Ride extends BaseController{

   /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   */
  static async getRide(req: Request, res: Response, db: any): Promise<any> {
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
        return res.status(200).json({totalCount: totalCount[0].count, results: rides});
    }catch(err) {
        console.log(err)
        logger.info(err.message)
        return Ride.errorHandler(
            req, res,
            'Unknown error',
            'SERVER_ERROR',
            200
        );
    }
  }

}