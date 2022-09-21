import HttpException from '@common/exceptions/http';
import { Request, Response } from 'express';

export const getDate = () =>
  new Date().toISOString().replace('T', ' ').substring(0, 19);

export const sendMethodResult = <T>(
  callback: (req: Request, res: Response) => T
) => {
  const method = async (req: Request, res: Response) => {
    try {
      const results: T = await callback(req, res);
      res.send({
        ok: true,
        results,
      });
    } catch (error) {
      const e = error as HttpException;
      res.statusCode = e.status;
      res.send({
        ok: false,
        message: e.message,
      });
    }
  };
  return method;
};

export const getParamsFormat = (config: object) => {
  const params = Object.entries(config)
    .map((param) => {
      const [key, value] = param;
      return `${key}=${value}`;
    })
    .join('&');
  return `?${params}`;
};
