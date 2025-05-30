import { Metadata } from 'next';
import { Suspense } from 'react';
import { type SearchParams } from 'next/dist/server/request/search-params';

import CabinList from '../_components/CabinList';
import Spinner from '../_components/Spinner';
import Filter from '../_components/Filter';

// export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Cabins',
};

type Props = {
  searchParams: SearchParams;
};

export type CapacityFilter = 'all' | 'small' | 'medium' | 'large';

export default async function Page({ searchParams }: Props) {
  const { capacity } = await searchParams;
  const capacityFilter: CapacityFilter = (capacity as CapacityFilter) ?? 'all';

  return (
    <div>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&#39;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className='flex justify-end mb-8'>
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={capacityFilter}>
        <CabinList capacityFilter={capacityFilter} />
      </Suspense>
    </div>
  );
}
