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

export type GuestCredentials = {
  fullName: string;
  email: string;
};

export type Guest = GuestCredentials & {
  id: number;
  nationality: string;
  countryFlag: string;
  nationalID: string;
  mobileNumber: number;
  created_at: string;
};

export type TUpdateGuest = {
  nationality: string;
  countryFlag: string;
  fullName: string;
  nationalID: string;
};
