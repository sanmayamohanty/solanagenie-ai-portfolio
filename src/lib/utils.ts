import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Rate limiting utility
export function rateLimit(requests: number, windowMs: number) {
  const requestTimes: number[] = [];
  
  return async function() {
    const now = Date.now();
    
    // Remove old requests outside the window
    while (requestTimes.length > 0 && requestTimes[0] <= now - windowMs) {
      requestTimes.shift();
    }
    
    // Check if we're at the limit
    if (requestTimes.length >= requests) {
      const waitTime = requestTimes[0] + windowMs - now;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return rateLimit(requests, windowMs)();
    }
    
    // Record this request
    requestTimes.push(now);
  };
}