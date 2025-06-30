'use server';

import { revalidatePath } from 'next/cache';
import type { TUpdateGuest } from '../_types/types';
import { auth, signIn, signOut } from './auth';
import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from './data-service';
import { redirect } from 'next/navigation';

export async function signInAction() {
  await signIn('google', {
    redirect: true,
    redirectTo: '/account',
  });
}

export async function signOutAction() {
  await signOut({
    redirect: true,
    redirectTo: '/',
  });
}

export async function updateProfile(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session)
    throw new Error('You must be signed in to update your profile.');

  if (
    formData.get('fullName') &&
    formData.get('nationalID') &&
    formData.get('nationality')
  ) {
    const nationalityValue = formData.get('nationality')! as string;
    const fullName = formData.get('fullName') as string;
    const nationalID = formData.get('nationalID') as string;

    const [nationality, countryFlag] = nationalityValue.split('%');

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
      throw new Error('National ID must be 6-12 characters long.');
    }

    const updateData: TUpdateGuest = {
      nationality,
      countryFlag,
      fullName,
      nationalID,
    };

    await updateGuest(+session.user.guestId, updateData);

    // Indicate success; reload should be handled in the client component
    revalidatePath('/account/profile');
  }
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();

  if (!session)
    throw new Error('You must be signed in to delete a reservation.');

  const guestBookings = await getBookings(session.user.guestId!);

  if (!guestBookings.find((booking) => booking.id === bookingId))
    throw new Error('You can only delete your own reservations.');

  await deleteBooking(bookingId);

  revalidatePath('/account/reservations');
}

export async function updateReservation(formData: FormData) {
  const session = await auth();

  if (!session)
    throw new Error('You must be signed in to delete a reservation.');

  console.log(formData);

  if (
    formData.get('numGuests') &&
    formData.get('bookingId') &&
    formData.get('observations')
  ) {
    const bookingId = formData.get('bookingId') as string;
    const numGuests = formData.get('numGuests') as string;
    const observations = formData.get('observations')?.slice(0, 500) as string;

    const guestBookings = await getBookings(session!.user.guestId!);
    if (!guestBookings.find((booking) => booking.id === +bookingId))
      throw new Error('You can only edit your own reservations.');

    await updateBooking(+bookingId, { numGuests, observations });

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    redirect(`/account/reservations`);
  }
}
