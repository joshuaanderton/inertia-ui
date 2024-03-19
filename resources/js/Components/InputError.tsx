import { PropsWithChildren } from 'react';

interface Props {
  message?: string;
  className?: string;
}

export default function InputError({
  message,
  className = '',
  children,
}: PropsWithChildren<Props>) {
  if (!message && !children) {
    return null;
  }
  return (
    <div className={`${className} text-xs text-red-600 dark:text-red-400`}>
      {message || children}
    </div>
  );
}
