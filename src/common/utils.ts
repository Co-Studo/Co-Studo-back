import IdTokenExpired from '@common/exceptions/id-token-expired';
import { NextFunction, Request, Response } from 'express';
import { FirebaseError } from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';
import { authService } from 'src/firebaseApp';

interface RequestWithUser extends Request {
  user: UserRecord;
}

export const getDate = () =>
  new Date().toISOString().replace('T', ' ').substring(0, 19);

export const sendMethodResult =
  <T>(callback: (req: Request, res: Response, next: NextFunction) => T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await callback(req, res, next);
      res.send(results);
    } catch (error) {
      next(error);
    }
  };

export const useAuth =
  <T>(
    callback: (req: RequestWithUser, res: Response, next: NextFunction) => T
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const accessToken = authorization?.split(' ')[1];
      if (!accessToken) {
        throw new Error('accessToken is required');
      }
      const { uid } = await authService.verifyIdToken(accessToken);
      const userRecord = await authService.getUser(uid);
      const requestWithUser = Object.assign(req, {
        user: userRecord,
      });
      return callback(requestWithUser, res, next);
    } catch (e) {
      const error = e as FirebaseError;
      if (error.code === 'auth/id-token-expired') {
        throw new IdTokenExpired();
      } else {
        throw new Error(error.message);
      }
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
