'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='text-center space-y-6 mt-4 flex flex-col items-center'>
      <h1 className='text-3xl font-semibold'>
        This cabin could not be found :(
      </h1>
      <div className='flex gap-4'>
        <button
          className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <button
          className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
          onClick={() => router.push('/')}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
