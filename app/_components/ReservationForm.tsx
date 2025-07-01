'use client';

import Image from 'next/image';
import Link from 'next/link';
import SubmitButton from './SubmitButton';

import { type User } from 'next-auth';
import { type Cabin, type Settings } from '../_types/types';
import { useReservationContext } from '../_context/ReservationContext';
import { differenceInDays, isWithinInterval } from 'date-fns';
import { createReservation } from '../_lib/actions';
import { useMemo, useState } from 'react';
import { formatCurrency } from '../_helpers/formatCurrency';

type Props = {
  cabin: Cabin;
  settings: Settings;
  user: User;
  bookedDates: Date[];
};

function ReservationForm({ cabin, user, bookedDates, settings }: Props) {
  const { getRange, resetRange } = useReservationContext();
  const { maxCapacity, regularPrice, discount, id: cabinId } = cabin;
  const { breakfastPrice } = settings;

  const [withBreakfast, setWithBreakfast] = useState(false);

  const range = getRange(cabin.id);
  const startDate = useMemo(() => range?.from ?? undefined, [range]);
  const endDate = useMemo(() => range?.to ?? undefined, [range]);

  const numNights = useMemo(
    () =>
      range?.from && range?.to ? differenceInDays(range.to, range.from) : 0,
    [range]
  );
  const cabinPrice = useMemo(
    () => numNights * (regularPrice - discount),
    [numNights, regularPrice, discount]
  );

  const totalPrice = useMemo(
    () => cabinPrice + (withBreakfast ? breakfastPrice * numNights : 0),
    [cabinPrice, withBreakfast, numNights, breakfastPrice]
  );

  const bookingData =
    startDate && endDate
      ? {
          cabinId,
          startDate,
          endDate,
          numNights,
          cabinPrice,
          totalPrice,
        }
      : null;

  const createBookingWithData = bookingData
    ? createReservation.bind(null, bookingData)
    : undefined;

  function handleSubmitForm(formData: FormData) {
    if (startDate && endDate && createBookingWithData) {
      if (
        bookedDates.some((date) =>
          isWithinInterval(date, { start: startDate, end: endDate })
        )
      ) {
        resetRange(cabinId);
      } else {
        createBookingWithData(formData);
      }
    }
  }

  return (
    <div>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <Link href='/account' className='flex gap-2 items-center'>
          {!!user.image && (
            <Image
              // Important to display google profile images
              referrerPolicy='no-referrer'
              className='rounded-full'
              src={user.image}
              alt={user?.name || 'User image'}
              width={18}
              height={18}
            />
          )}
          <p>{user.name}</p>
        </Link>
      </div>

      <form
        className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'
        action={handleSubmitForm}
      >
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm outline-none'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <input type='hidden' name='cabinData' value={cabin.id} id='cabinId' />

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm outline-none'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex items-center gap-4 space-y-2'>
          <input
            name='hasBreakfast'
            id='hasBreakfast'
            value={withBreakfast ? 'true' : 'false'}
            onChange={(e) => setWithBreakfast(e.target.checked)}
            type='checkbox'
            className='w-5 h-5'
          />
          <label htmlFor='hasBreakfast'>Will you need breakfast?</label>
        </div>

        <div className='flex justify-end items-center gap-6'>
          {!numNights && (
            <span className='text-base text-primary-200'>
              Start by selecting dates
            </span>
          )}
          <SubmitButton
            label='Reserve now'
            pendingLabel='Reserving...'
            disabled={!bookingData}
          />
        </div>
      </form>
      <div className='bg-primary-800 text-primary-300 px-16 py-2'>
        <p>
          Total price:{' '}
          <span className='font-bold'>{formatCurrency(totalPrice)}</span>
        </p>
      </div>
    </div>
  );
}

export default ReservationForm;
