'use server';

import { signIn, signOut } from './auth';

export async function signInAction() {
  await signIn('google', {
    redirect: true,
    redirectTo: '/account',
  });
}

export async function signOutAction() {
  await signOut({
    redirect: true,
    redirectTo: '/',
  });
}
