import { type Metadata } from 'next';
import { auth } from '../_lib/auth';

export const metadata: Metadata = {
  title: 'Account',
};

export default async function Page() {
  const session = await auth();

  return (
    <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
      Welcome, {session!.user!.name}
    </h2>
  );
}
