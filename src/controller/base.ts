/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
export default abstract class BaseController {
  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   * @param {mesage} string error
   * @param {status} HttpCode status
   */
  static errorHandler(req: Request, res: Response, message: string, error_code: string, status: number,): any {
    return res.status(status || 400).json({
      message,
      error_code,
    })
  }

  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   * @param {data} ctx.data response data
   * @param {status} HttpCode status
   */
  static successHandler(req: Request, res: Response, data: any, status: number): any {
    return res.status(status || 200).json(data);
  }
}
