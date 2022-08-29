import BadRequestException from '@common/exceptions/bad-request';
import NotFoundException from '@common/exceptions/not-found';
import UnauthorizedException from '@common/exceptions/unauthorized';
import * as jwtUtil from '@common/jwt-util';
import User, { IUser } from '@models/User';

export const findAll = async (): Promise<IUser[]> => User.find();

export const findById = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundException('User Not Found');
  return user;
};

export const findByEmail = async (email: string): Promise<IUser> => {
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundException('User Not Found');
  return user;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  const { ok: refreshOk, id: userId } = jwtUtil.verify(refreshToken);
  if (!refreshOk) {
    // refresh token 만료
    throw new BadRequestException(
      '로그인 정보가 만료되었습니다. 다시 로그인 해주세요.'
    );
  }
  if (!userId) throw new NotFoundException('해당하는 Id 의 User 가 없습니다.');

  const { accessToken: newAccessToken } = await jwtUtil.refreshVerify(
    refreshToken,
    userId
  );

  if (!newAccessToken) {
    throw new UnauthorizedException('Access Token Refresh 실패');
  }
  return newAccessToken;
};

export const findByCookie = async (
  cookie: string
): Promise<{ user: IUser; newAccessToken?: string }> => {
  let newAccessToken;

  const matchedAccessToken = cookie.match(/accessToken=\S+/);
  if (!matchedAccessToken) {
    throw new NotFoundException('Not include access-token');
  }
  const accessToken = matchedAccessToken[0].split('=')[1].slice(0, -1);

  const { ok, id } = jwtUtil.verify(accessToken);

  if (!ok) {
    const matchedRefreshToken = cookie.match(/refreshToken=\S+/);
    if (!matchedRefreshToken) {
      throw new NotFoundException('Not include refresh-token');
    }
    const refreshToken = matchedRefreshToken[0].split('=')[1].slice(0, -1);
    newAccessToken = await refreshAccessToken(refreshToken);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundException('User Not found by id (find by cookie)');
  }
  return { user, newAccessToken };
};
