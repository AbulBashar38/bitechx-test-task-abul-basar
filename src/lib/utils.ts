import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidImageUrl(url: string): string {
  try {
    new URL(url);
    return url;
  } catch {
    return "/placeholder.jpg";
  }
}
