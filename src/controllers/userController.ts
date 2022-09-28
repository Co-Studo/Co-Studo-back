import { getParamsFormat, sendMethodResult } from '@common/utils';
import * as userService from '@services/userService';
import axios from 'axios';
import { authService } from 'src/firebaseApp';

const accessTokenUrl = 'https://github.com/login/oauth/access_token';
const githubApiUrl = 'https://api.github.com';

// export const getMe = sendMethodResult((req) => userService.getMe());

export const getUsers = sendMethodResult(async () => {
  const users = await (await authService.listUsers()).users;
  return users.map((user) => ({ email: user.email }));
});

export const createUser = sendMethodResult(async (req) => {
  const { email, password } = req.body;
  const newUserRecord = await authService.createUser({
    email,
    password,
  });
  return newUserRecord;
});

export const signInWithGithub = sendMethodResult(async (req) => {
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

  const user = await userService.getUserByEmail(email);
  if (user) {
    return user;
  }
  const newUser = await authService.createUser({
    email,
    photoURL: avatar_url,
    displayName: name,
  });
  return newUser;
});
