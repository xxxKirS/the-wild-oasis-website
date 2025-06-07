'use client';

import { isWithinInterval } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { useReservationContext } from '../_context/ReservationContext';
import { useEffect, useState } from 'react';
import { type Cabin, type Settings } from '../_types/types';

function isAlreadyBooked(range: DateRange, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

type Props = {
  settings: Settings;
  cabin: Cabin;
  bookedDates: Date[];
};

function DateSelector({ settings, cabin, bookedDates }: Props) {
  const { setRange, resetRange, newRange, getRange } = useReservationContext();
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const numNights = 23;
  const { discount, regularPrice, id } = cabin;
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  useEffect(() => {
    const rangeIsExist = getRange(id);
    if (!rangeIsExist) {
      newRange(id);
    } else {
      setSelectedRange(rangeIsExist);
    }
  }, [id, getRange, newRange]);

  useEffect(() => {
    const rangeIsExist = getRange(id);
    if (rangeIsExist && (!rangeIsExist.from || !rangeIsExist.to)) {
      console.log('1qwe');
      resetRange(id);
    }
  }, []);

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='pt-12 place-self-center'
        mode='range'
        selected={selectedRange}
        onSelect={(range) => {
          setSelectedRange(range!);
          setRange(range!, id);
        }}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        // captionLayout='dropdown'
        numberOfMonths={2}
      />

      <div className='flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]'>
        <div className='flex items-baseline gap-6'>
          <p className='flex gap-2 items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='line-through font-semibold text-primary-700'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numNights ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{' '}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {selectedRange?.from || selectedRange?.to ? (
          <button
            className='border border-primary-800 py-2 px-4 text-sm font-semibold'
            onClick={() => {
              resetRange(id);
              setSelectedRange({ from: undefined, to: undefined });
            }}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
