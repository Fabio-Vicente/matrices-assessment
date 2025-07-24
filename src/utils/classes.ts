import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
