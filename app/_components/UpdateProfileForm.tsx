'use client';

import { type ReactNode } from 'react';
import type { Guest } from '../_types/types';
import { updateProfile } from '../_lib/actions';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';

type Props = {
  children: ReactNode;
  guest: Guest;
};

export default function UpdateProfileForm({ children, guest }: Props) {
  const { fullName, email, countryFlag, nationalID } = guest;

  return (
    <form
      action={updateProfile}
      className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
    >
      <div className='space-y-2'>
        <label htmlFor='name'>Full name</label>
        <input
          id='name'
          name='fullName'
          defaultValue={fullName}
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='email'>Email address</label>
        <input
          id='email'
          name='email'
          defaultValue={email}
          disabled
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='nationality'>Where are you from?</label>
          {countryFlag && (
            <Image
              src={countryFlag}
              alt='Country flag'
              className='h-5 rounded-sm'
              width={25}
              height={20}
            />
          )}
        </div>

        {children}
      </div>

      <div className='space-y-2'>
        <label htmlFor='nationalID'>National ID number</label>
        <input
          placeholder='National ID'
          defaultValue={nationalID}
          title='Enter your National ID'
          name='nationalID'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='flex justify-end items-center gap-6'>
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className='bg-accent-500 w-52 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
      disabled={pending}
    >
      {pending ? 'Updating...' : 'Update profile'}
    </button>
  );
}
