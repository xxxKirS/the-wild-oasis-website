import { updateReservation } from '@/app/_lib/actions';
import { auth } from '@/app/_lib/auth';
import { getBooking, getBookings, getCabin } from '@/app/_lib/data-service';
import type { Params } from 'next/dist/server/request/params';

import SubmitButton from '@/app/_components/SubmitButton';

type Props = {
  params: Params;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const guestBookings = await getBookings(session!.user.guestId!);

  if (!guestBookings.find((booking) => booking.id === +id!))
    throw new Error('You can only edit your own reservations.');

  const { cabinId, numGuests, observations } = await getBooking(+id!);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
        Edit Reservation #{id}
      </h2>

      <form
        className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
        action={updateReservation}
      >
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            defaultValue={numGuests}
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
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

        <input type='hidden' name='bookingId' value={id} readOnly />

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            title='Observations'
            id='observations'
            defaultValue={observations}
            name='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          <SubmitButton label='Edit' pendingLabel='Editing...' />
        </div>
      </form>
    </div>
  );
}
