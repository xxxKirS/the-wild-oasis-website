import { eachDayOfInterval } from 'date-fns';
import { supabase } from './supabase';
import { notFound } from 'next/navigation';

import {
  type Cabin,
  type GuestCredentials,
  type Guest,
  type TUpdateGuest,
  type Booking,
  type TGetBookings,
  type TNewBooking,
  type TUpdateBooking,
} from '../_types/types';
import { type Settings } from '../_types/types';

/////////////
// GET

export async function getCabin(id: number): Promise<Cabin> {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function (): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, images')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest> {
  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: number): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}

export async function getBookings(guestId: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, images)'
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error || !data) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Ensure cabins is a single object and types are correct
  const bookings: TGetBookings = data.map((booking) => ({
    ...booking,
    cabins: Array.isArray(booking.cabins) ? booking.cabins[0] : booking.cabins,
  }));
  return bookings;
}

export async function getBookedDatesByCabinId(cabinId: number) {
  let today: Date | string = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);
  // .or(`startDate.gte.${today}`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: GuestCredentials) {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

export async function createBooking(newBooking: TNewBooking) {
  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id: number, updatedFields: TUpdateGuest) {
  console.log(id);
  const { error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id);
  // .select()
  // .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
}

export async function updateBooking(id: number, updatedFields: TUpdateBooking) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
}
