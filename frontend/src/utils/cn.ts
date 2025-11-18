import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes do Tailwind CSS sem conflitos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}