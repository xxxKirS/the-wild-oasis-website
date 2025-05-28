'use client';

import { useState } from 'react';

import { UsersIcon } from '@heroicons/react/24/solid';

import Image from 'next/image';
import { Cabin } from './CabinList';

type Props = {
  cabin: Cabin;
};

function CabinCard({ cabin }: Props) {
  const { id, name, maxCapacity, regularPrice, discount, images } = cabin;
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className='flex border-primary-800 border '>
      <div className='relative flex-1'>
        <Image
          src={images[imageIndex]}
          sizes='auto'
          fill
          alt={`Cabin ${name}`}
          className='object-cover border-r border-primary-800'
        />
        <div className='absolute bottom-8 left-1/2 flex gap-4'>
          {images.length > 1 &&
            images.map((_, i) => (
              <div
                className='w-4 h-4 bg-slate-300 rounded-full'
                key={i}
                onClick={() => setImageIndex(i)}
              ></div>
            ))}
        </div>
      </div>

      <div className='flex-grow'>
        <div className='pt-5 pb-4 px-7 bg-primary-950'>
          <h3 className='text-accent-500 font-semibold text-2xl mb-3'>
            Cabin {name}
          </h3>

          <div className='flex gap-3 items-center mb-2'>
            <UsersIcon className='h-5 w-5 text-primary-600' />
            <p className='text-lg text-primary-200'>
              For up to <span className='font-bold'>{maxCapacity}</span> guests
            </p>
          </div>

          <p className='flex gap-3 justify-end items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-3xl font-[350]'>
                  ${regularPrice - discount}
                </span>
                <span className='line-through font-semibold text-primary-600'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-3xl font-[350]'>${regularPrice}</span>
            )}
            <span className='text-primary-200'>/ night</span>
          </p>
        </div>

        <div className='bg-primary-950 border-t border-t-primary-800 text-right'>
          <a
            href={`/cabins/${id}`}
            className='border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900'
          >
            Details & reservation &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
