import { getCabins } from '../_lib/data-service';

import CabinCard from './CabinCard';

export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  images: string[];
  description?: string;
};

type Cabins = Cabin[];

export default async function CabinList() {
  const cabins: Cabins = await getCabins();
  return (
    <>
      {cabins?.length > 0 && (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
          {cabins?.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
      {cabins?.length === 0 && (
        <p className='text-lg text-primary-500'>No cabins found...</p>
      )}
    </>
  );
}
