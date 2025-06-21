import React from 'react';
import SignInButton from '../_components/SignInButton';

export const metadata = {
  title: 'Sign in',
  description: 'Sign in to your account',
};

export default function page() {
  return (
    <div className='flex flex-col gap-10 mt-10 items-center'>
      <h2 className='text-3xl font-semibold'>Sign in to access your account</h2>
      <SignInButton />
    </div>
  );
}
