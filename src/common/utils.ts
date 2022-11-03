import { NextFunction, Request, Response } from 'express';

export const getDate = () =>
  new Date().toISOString().replace('T', ' ').substring(0, 19);

export const sendMethodResult =
  <T>(callback: (req: Request, res: Response, next: NextFunction) => T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await callback(req, res, next);
      res.send(results);
      next();
    } catch (error) {
      next(error);
    }
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
