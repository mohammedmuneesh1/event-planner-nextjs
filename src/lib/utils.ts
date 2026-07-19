import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function countByStatus(rsvpsArray: {status:("going" | "maybe" | "not_going") | null }[]  | null) { 

if (rsvpsArray === null) {
  return {
    goingCount: 0,
    maybeCount: 0,
    notGoingCount: 0,
  };
}
    

    let goingCount = 0 ;
    let maybeCount = 0;
    let notGoingCount = 0;

    for (const rsvp of rsvpsArray) {
        if (rsvp?.status === 'going') {
          goingCount++;
        } else if (rsvp?.status === 'maybe') {
          maybeCount++;
        } else if (rsvp?.status === 'not_going') {
          notGoingCount++;
        }
      }

      return { goingCount, maybeCount, notGoingCount };
    }