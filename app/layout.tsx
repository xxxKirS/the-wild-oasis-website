import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';

import Header from './_components/Header';
import '@/app/_styles/globals.css';
import 'react-day-picker/dist/style.css';
import ReservationProvider from './_context/ReservationContext';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
  // weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen flex flex-col relative ${josefin.className}`}
      >
        <Header />

        <div className='flex-1 px-8 py-12 grid'>
          <ReservationProvider>
            <main className='max-w-7xl mx-auto w-full'>{children}</main>
          </ReservationProvider>
        </div>
      </body>
    </html>
  );
}
