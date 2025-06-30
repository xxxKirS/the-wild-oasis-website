'use client';

import { useFormStatus } from 'react-dom';

type Props = {
  label: string;
  className?: string;
  pendingLabel: string;
};
export default function Button({ label, className, pendingLabel }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-accent-500 w-52 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ${className}`}
      disabled={pending}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
