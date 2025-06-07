'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservationContext } from '../_context/ReservationContext';
import Link from 'next/link';

function ReservationReminder() {
  const { ranges, resetRange } = useReservationContext();

  if (ranges.length === 0) return null;

  const found = ranges.find(
    (item) => item.range.from !== undefined && item.range.to !== undefined
  );

  if (!found) return null;

  const { range, cabinId } = found;

  return (
    <Link
      className='fixed bottom-6 right-6 py-5 px-8 rounded-sm bg-accent-500 text-primary-800 text font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center cursor-pointer'
      href={`cabins/${cabinId}`}
    >
      <p>
        <span>👋</span> Don&#39;t forget to reserve your dates <br /> from{' '}
        {format(new Date(range.from!), 'MMM dd yyyy')} to{' '}
        {format(new Date(range.to!), 'MMM dd yyyy')}
      </p>
      <button
        title='Close Reminder'
        className='rounded-full p-1 hover:bg-accent-600 transition-all'
        onClick={(e) => {
          e.preventDefault();
          resetRange(cabinId);
        }}
      >
        <XMarkIcon className='h-5 w-5' />
      </button>
    </Link>
  );
}

export default ReservationReminder;
