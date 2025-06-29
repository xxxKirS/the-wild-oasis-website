'use server';

import { revalidatePath } from 'next/cache';
import type { TUpdateGuest } from '../_types/types';
import { auth, signIn, signOut } from './auth';
import { updateGuest } from './data-service';

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
