import Cabin from '@/app/_components/Cabin';
import Reservations from '@/app/_components/Reservations';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import React, { Suspense } from 'react';

type Props = {
  params: Promise<{ cabinId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { cabinId } = await params;
  const { name } = await getCabin(+cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }));
}

export default async function Page({ params }: Props) {
  const { cabinId } = await params;
  const cabin = await getCabin(+cabinId);

  const { name } = cabin;

  return (
    <div className='max-w-6xl mx-auto mt-8 flex flex-col min-h-full'>
      <Cabin cabin={cabin} />

      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
