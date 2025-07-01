'use client';

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import { useReservationContext } from '../_context/ReservationContext';
import { useEffect, useMemo, useState } from 'react';

import { type DateRange, DayPicker } from 'react-day-picker';
import { type Cabin, type Settings } from '../_types/types';
import { formatCurrency } from '../_helpers/formatCurrency';

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  if (!range?.from || !range?.to) return false;

  return datesArr.some((date) =>
    range.from && range.to
      ? isWithinInterval(date, { start: range.from, end: range.to })
      : false
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

  const { discount, regularPrice, id } = cabin;
  const numNights =
    selectedRange?.from != null && selectedRange?.to != null
      ? differenceInDays(selectedRange.to, selectedRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  const rangeIsExist = useMemo(() => getRange(id), [id, getRange]);

  const isRangeBooked = useMemo(() => {
    if (selectedRange?.from && selectedRange?.to) {
      return isAlreadyBooked(selectedRange, bookedDates);
    }
    return false;
  }, [selectedRange, bookedDates]);

  useEffect(() => {
    if (!rangeIsExist) {
      newRange(id);
    } else if (rangeIsExist) {
      setSelectedRange(rangeIsExist);
    }
  }, [rangeIsExist, id, newRange]);

  useEffect(() => {
    if (isRangeBooked) {
      setSelectedRange({
        from: undefined,
        to: undefined,
      });
      resetRange(id);
    }
  }, [isRangeBooked, resetRange, id]);

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='pt-12 place-self-center'
        mode='range'
        selected={selectedRange}
        onSelect={(range) => {
          if (!isAlreadyBooked(range!, bookedDates)) {
            setSelectedRange(range!);
            setRange(range!, id);
          } else {
            setSelectedRange({
              from: undefined,
              to: undefined,
            });
          }
        }}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        // captionLayout='dropdown'
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
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
                <span className='text-xl font-semibold'>
                  {formatCurrency(cabinPrice)}
                </span>
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
