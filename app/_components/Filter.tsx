'use client';

import React from 'react';
import { CapacityFilter } from '../cabins/page';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const capacityOptions: {
  capacity: CapacityFilter;
  guests: [number, number] | 'All cabins';
}[] = [
  {
    capacity: 'all',
    guests: 'All cabins',
  },
  {
    capacity: 'small',
    guests: [1, 3],
  },
  {
    capacity: 'medium',
    guests: [4, 7],
  },
  {
    capacity: 'large',
    guests: [8, 12],
  },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const capacityParams = searchParams.get('capacity') ?? 'all';

  function handleFilter(capacity: CapacityFilter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', capacity);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='border border-primary-800 flex'>
      {capacityOptions.map((param) => (
        <button
          key={param.capacity}
          onClick={() => handleFilter(param.capacity)}
          className={`px-5 py-2 hover:bg-primary-700 ${
            capacityParams === param.capacity &&
            'bg-primary-700 text-primary-50'
          }`}
        >
          {param.guests === 'All cabins'
            ? param.guests
            : param.guests.join(' - ') + ' guests'}
        </button>
      ))}
    </div>
  );
}
