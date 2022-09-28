import { getParamsFormat, sendMethodResult } from '@common/utils';
import * as userService from '@services/userService';
import axios from 'axios';
import type { Request, Response } from 'express';
import type { UserRecord } from 'firebase-admin/auth';
import { authService } from 'src/firebaseApp';

const accessTokenUrl = 'https://github.com/login/oauth/access_token';
const githubApiUrl = 'https://api.github.com';

// export const getMe = sendMethodResult<UserRecord | null>(() =>
//   userService.getMe()
// );

export const signIn = sendMethodResult(async (req: Request) => {
  const { email, password } = req.body;
  const newUserRecord = await authService.createUser({
    email,
    password,
  });
  return newUserRecord;
});

export const signInWithGithub = async (req: Request, res: Response) => {
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

  // email 에 해당하는 아이다가 있으면 firebase 에서 로그인
  // 없으면 firebase 에서 회원가입
  const user = await userService.getUserByEmail(email);
  if (user) {
    // 로그인
    // authService.createCustomToken(user.uid)
    // authService.verifyIdToken()
  }
  // await userService.githubSignIn(req);
  return res.status(201).send({ ok: true });
};
