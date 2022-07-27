import { Request, Response } from 'express';

export const getDate = () =>
  new Date().toISOString().replace('T', ' ').substring(0, 19);

export const sendMethodResult = (
  callback: (req: Request, res: Response) => void
) => {
  const method = async (req: Request, res: Response) => {
    try {
      const results = await callback(req, res);
      res.send({
        ok: true,
        results,
      });
    } catch (error) {
      const e = error as Error;
      res.send({
        ok: false,
        message: e.message,
      });
    }
  };
  return method;
};