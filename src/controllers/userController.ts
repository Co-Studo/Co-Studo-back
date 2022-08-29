import * as jwtUtil from '@common/jwt-util';
import { getDate, getParamsFormat } from '@common/utils';
import User from '@models/User';
import axios from 'axios';
import { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  const { cookie } = req.headers;

  if (!cookie) throw Error('Not include cookie');

  const matchedAccessToken = cookie.match(/accessToken=\S+/);
  if (!matchedAccessToken) throw Error('Not include access-token');
  const accessToken = matchedAccessToken[0].split('=')[1].slice(0, -1);

  const { ok, id } = jwtUtil.verify(accessToken);

  if (!ok) {
    // refresh
    const matchedRefreshToken = cookie.match(/refreshToken=\S+/);
    if (!matchedRefreshToken) throw Error('Not include refresh-token');
    const refreshToken = matchedRefreshToken[0].split('=')[1].slice(0, -1);
    const { ok: refreshOk, id: userId } = jwtUtil.verify(refreshToken);
    if (!refreshOk) {
      // refresh token 만료
      throw Error('로그인 정보가 만료되었습니다. 다시 로그인 해주세요.');
    }
    if (!userId) throw Error('user not found');
    const { accessToken: newAccessToken } = await jwtUtil.refreshVerify(
      refreshToken,
      userId
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.cookie('accessToken', newAccessToken, {
      // maxAge: 120_000,
      httpOnly: true,
      secure: true,
    });
    const user = await User.findById(userId);
    return user;
  }
  const user = await User.findById(id);
  return user;
};

export const getUsers = async () => {
  const users = await User.find();
  return users;
};

export const getUser = async (req: Request) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return user;
};

export const createUser = async (req: Request) => {
  const createdAt = getDate();
  const updatedAt = createdAt;
  const newUserData = {
    ...req.body,
    createdAt,
    updatedAt,
  };
  const newUser = await User.create(newUserData);

  return newUser;
};

const accessTokenUrl = 'https://github.com/login/oauth/access_token';
const githubApiUrl = 'https://api.github.com';

export const githubLogin = async (req: Request, res: Response) => {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const config = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
  };
  const params = getParamsFormat(config);
  const tokenRequest = await axios.post(
    `${accessTokenUrl}${params}`,
    {},
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  const { access_token } = tokenRequest.data;
  const {
    data: { avatar_url, name },
  } = await axios.get<{ avatar_url: string; name: string }>(
    `${githubApiUrl}/user`,
    {
      headers: {
        Authorization: `token ${access_token}`,
      },
    }
  );

  const { data: emailData } = await axios.get(`${githubApiUrl}/user/emails`, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  const { email } = emailData.find(
    (emailInfo: { primary: boolean; verified: boolean }) => {
      const isPrimary = emailInfo.primary === true;
      const isVerified = emailInfo.verified === true;
      return isPrimary && isVerified;
    }
  );

  const existingUser = await User.findOne({ email });
  let newUser;
  if (!existingUser) {
    newUser = await User.create({
      nickname: name,
      avatarUrl: avatar_url,
      email,
      createdAt: getDate(),
      updatedAt: getDate(),
    });
  } else {
    newUser = existingUser;
  }
  const appAccessToken = jwtUtil.sign(newUser._id.toString());
  const appRefreshToken = await jwtUtil.refresh(newUser._id.toString());

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.cookie('accessToken', appAccessToken, {
    // maxAge: 120_000,
    httpOnly: true,
    secure: true,
  });
  res.cookie('refreshToken', appRefreshToken, {
    // maxAge: 600_000,
    httpOnly: true,
    secure: true,
  });
};
