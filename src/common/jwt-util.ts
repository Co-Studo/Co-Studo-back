import redisClient from '@common/redis';
import jwt from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET_KEY;

if (!jwtSecretKey) {
  throw Error('JWT Secret Key is not found');
}

export const sign = (userId: string) =>
  jwt.sign({ id: userId }, jwtSecretKey, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });

export const verify = (token: string) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, jwtSecretKey) as jwt.JwtPayload;
    if (!decoded) {
      throw Error('Failed decode json web token');
    }
    return {
      ok: true,
      id: decoded.id,
    };
  } catch (error) {
    const e = error as Error;
    return {
      ok: false,
      message: e.message,
    };
  }
};

export const refresh = async (userId: string) => {
  const refreshToken = jwt.sign({ id: userId }, jwtSecretKey, {
    algorithm: 'HS256',
    expiresIn: '14d',
  });
  await redisClient.set(userId, refreshToken);
  return refreshToken;
};

export const refreshVerify = async (token: string, userId: string) => {
  try {
    const data = await redisClient.get(userId);
    if (data === token) {
      return verify(token);
    }
    return {
      ok: false,
      message: 'Failed token validation',
    };
  } catch (error) {
    const e = error as Error;
    return {
      ok: false,
      message: e.message,
    };
  }
};
