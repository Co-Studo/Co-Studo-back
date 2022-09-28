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
      if (error instanceof HttpException) {
        res.status(error.status).send({
          ok: false,
          message: error.message,
        });
      } else if (error instanceof Error) {
        res.status(500).send({
          ok: false,
          message: error.message,
        });
      } else {
        res.status(500).send({
          ok: false,
          message: 'Unknown Error',
        });
      }
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
