import React from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import { type Cabin } from '../_types/types';
import { auth } from '../_lib/auth';
import LoginMessage from './LoginMessage';

type Props = {
  cabin: Cabin;
};

export default async function Reservations({ cabin }: Props) {
  const [settings, bookedDates, session] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
    auth(),
  ]);

  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
