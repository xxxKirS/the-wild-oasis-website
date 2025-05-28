import {
  HomeModernIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';

const navLinks = [
  {
    name: 'About',
    href: '/about',
    icon: <InformationCircleIcon className='h-6 w-6 text-primary-600' />,
  },
  {
    name: 'Cabins',
    href: '/cabins',
    icon: <HomeModernIcon className='h-6 w-6 text-primary-600' />,
  },
  {
    name: 'Account',
    href: '/account',
    icon: <UserCircleIcon className='h-6 w-6 text-primary-600' />,
  },
];

export default function Navigation() {
  return (
    <nav className='z-10 text-xl'>
      <ul className='flex gap-16 items-center'>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className='hover:text-accent-400 transition-colors flex gap-2'
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
