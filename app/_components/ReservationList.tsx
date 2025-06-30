'use client';

import React, { useOptimistic } from 'react';
import type { TGetBookings } from '../_types/types';
import ReservationCard from './ReservationCard';
import { deleteReservation } from '../_lib/actions';

type Props = {
  bookings: TGetBookings;
};

export default function ReservationList({ bookings }: Props) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, id) => {
      return curBookings.filter((booking) => booking.id !== id);
    }
  );

  async function handleDelete(id: number) {
    optimisticDelete(id);
    await deleteReservation(id);
  }

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
