import type { User } from 'next-auth';

export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export type CapacityFilterType = 'all' | 'small' | 'medium' | 'large';

export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  images: string[];
  description?: string;
};

export type Guest = {
  fullName: string;
  email: string;
};

// export interface Session {
//   user: User & {
//     guestId: number;
//   };
// }
