import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href='/' className='flex flex-row items-center gap-4 z-10'>
      <Image src='/logo.png' alt='Logo' width={64} height={64} />
      <span className='text-xl font-semibold text-primary-100'>
        The Wild Oasis
      </span>
    </Link>
  );
}
