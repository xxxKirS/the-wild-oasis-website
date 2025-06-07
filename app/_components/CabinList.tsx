import { getCabins } from '../_lib/data-service';
import { unstable_noStore } from 'next/cache';

import CabinCard from './CabinCard';
import { type Cabin, type CapacityFilterType } from '../_types/types';

type Cabins = Cabin[];

type CabinListProps = {
  capacityFilter: CapacityFilterType;
};

export default async function CabinList({ capacityFilter }: CabinListProps) {
  unstable_noStore();
  const cabins: Cabins = await getCabins();

  if (!cabins) return null;

  let displayedCabins: Cabins = [];

  // Filter
  if (capacityFilter === 'all') displayedCabins = cabins;
  if (capacityFilter === 'small')
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (capacityFilter === 'medium')
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 8
    );
  if (capacityFilter === 'large')
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity > 8);

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
