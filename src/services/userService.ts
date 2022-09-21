import { User } from '@common/entities/User';
import { getAuth, GithubAuthProvider, signInWithRedirect } from 'firebase/auth';

// not working
export const githubSignIn = async () => {
  const provider = new GithubAuthProvider();
  provider.setCustomParameters({
    allow_signup: 'false',
  });
  const auth = getAuth();
  const result = await signInWithRedirect(auth, provider);

  if (result) {
    console.log(result);
  }
};

export const findAll = async (): Promise<User[]> => [];

export const findById = async (id: string): Promise<User> => ({
  email: 'asd',
  nickname: 'asd',
  avatartUrl: 'asd',
  createdAt: new Date(),
  updatedAt: new Date(),
});
