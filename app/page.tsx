import Image from 'next/image';
import Link from 'next/link';

import bg from '@/public/bg.png';

export default function Home() {
  return (
    <div className='mt-24'>
      <Image
        src={bg}
        fill
        quality={100}
        placeholder='blur'
        alt='Mountains and forests with two cabins'
        className='object-cover object-top'
      />

      <div className='relative z-10 text-center'>
        <h1 className='text-8xl text-primary-50 mb-12 tracking-tight font-normal'>
          Welcome to paradise.
        </h1>
        <Link
          href='/cabins'
          className='bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all'
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}
