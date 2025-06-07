'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

type InitialState = { range: DateRange; cabinId: number }[];

const initialState: InitialState = [];

type ContextValue = {
  ranges: InitialState;
  setRange: (range: DateRange, id: number) => void;
  newRange: (id: number) => void;
  resetRange: (id: number) => void;
  getRange: (id: number) => DateRange | undefined;
};

const ReservationContext = createContext<ContextValue | null>(null);

type ReservationContextProps = {
  children: React.ReactNode;
};

export default function ReservationProvider({
  children,
}: ReservationContextProps) {
  const [ranges, setRangeState] = useState<InitialState>(initialState);

  const resetRange = useCallback(
    (id: number) =>
      setRangeState((ranges) => ranges.filter((item) => item.cabinId !== id)),
    []
  );

  const setRange = useCallback(
    (range: DateRange, id: number) => {
      setRangeState((ranges) =>
        ranges.map((item) => (item.cabinId === id ? { ...item, range } : item))
      );
    },
    [setRangeState]
  );

  const ctx: ContextValue = {
    ranges: ranges,
    setRange,
    resetRange,
    newRange: useCallback((id) => {
      setRangeState((ranges) => [
        ...ranges,
        { range: { from: undefined, to: undefined }, cabinId: id },
      ]);
    }, []),
    getRange: useCallback(
      (id) => {
        return ranges.find((item) => item.cabinId === id)?.range;
      },
      [ranges]
    ),
  };

  return (
    <ReservationContext.Provider value={ctx}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservationContext() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error(
      'useReservationContext must be used within a ReservationProvider'
    );
  }

  return ctx;
}
