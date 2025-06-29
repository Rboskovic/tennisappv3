import { clsx, type ClassValue } from "clsx";

/**
 * Utility function for conditionally joining classNames
 * Combines clsx for conditional classes with potential for twMerge
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
