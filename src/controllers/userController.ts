import * as jwtUtil from '@common/jwt-util';
import { getDate, getParamsFormat, sendMethodResult } from '@common/utils';
import User from '@models/User';

export const getUsers = sendMethodResult(async () => {
  const users = await User.find();
  return users;
});

export const getUser = sendMethodResult(async (req) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return user;
});

export const createUser = sendMethodResult(async (req) => {
  const createdAt = getDate();
  const updatedAt = createdAt;
  const newUserData = {
    ...req.body,
    createdAt,
    updatedAt,
  };
  const newUser = await User.create(newUserData);

  return newUser;
});

const accessTokenUrl = 'https://github.com/login/oauth/access_token';
const githubApiUrl = 'https://api.github.com';

export const githubLogin = sendMethodResult(async (req) => {
  try {
    const { code } = req.query;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const config = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
    };
    const params = getParamsFormat(config);
    const response = await fetch(`${accessTokenUrl}${params}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });
    const tokenRequest = await response.json();
    const { access_token } = tokenRequest;
    const userRequest = await fetch(`${githubApiUrl}/user`, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const { email, avatar_url, name } = await userRequest.json();
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
    const appAccessToken = jwtUtil.sign(newUser._id);
    const appRefreshToken = jwtUtil.refresh(newUser._id);
    return { accessToken: appAccessToken, refreshToken: appRefreshToken };
  } catch (error) {
    const e = error as Error;
    return {
      ok: false,
      message: e.message,
    };
  }
});
