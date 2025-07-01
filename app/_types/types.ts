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

export type TUpdateBooking = {
  numGuests: number;
  observations?: string;
};

export type Booking = {
  id: number;
  cabinId: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  status: 'checked-in' | 'checked-out' | 'unconfirmed';
  totalPrice: number;
  created_at: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
};

export type TNewBooking = {
  cabinId: number;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  observations?: string;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  hasBreakfast: boolean;
  guestId: number;
  status: 'checked-in' | 'checked-out' | 'unconfirmed';
  created_at: Date;
};

export type Bookings = Booking[];

export type TGetBooking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    images: string[];
  };
};

export type TGetBookings = TGetBooking[];
