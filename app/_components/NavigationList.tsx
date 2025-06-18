'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { type Session } from 'next-auth';

const navLinks = [
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Cabins',
    href: '/cabins',
  },
  // {
  //   name: 'Account',
  //   href: '/account',
  // },
];

type Props = {
  session: Session | null;
};

export default function NavigationList({ session }: Props) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={`hover:text-accent-400 transition-colors flex items-center gap-4 ${
              pathname.includes(link.href) && 'text-accent-400'
            }`}
          >
            <span>{link.name}</span>
          </Link>
        </li>
      ))}
      <li>
        <Link
          href='/account'
          className={`hover:text-accent-400 transition-colors flex items-center gap-4 ${
            pathname.includes('/account') && 'text-accent-400'
          }`}
        >
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User image'}
              className='w-6 h-6 rounded-full'
              referrerPolicy='no-referrer'
            />
          )}
          {session?.user?.name && <span>{session.user.name}</span>}
          {!session?.user?.name && <span>Account</span>}
        </Link>
      </li>
    </>
  );
}
