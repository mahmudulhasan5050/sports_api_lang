import mongoose from 'mongoose';
import moment from 'moment-timezone';
import { IBooking } from '../models/Booking';

// Function to generate time slots in 30-minute intervals
// Here openTime and closeTime convert kora hoise Moment diye.
// Ajker date neya hoise and ajker time neya hoise as now.
// While loop a jodi ajker date hoy tahole slot create hobe koyta baje tar upor.
// Mane holo ajke er date a joto time gese tar por theke slot gula create hobe.
// But porer din gulate pura diner slot create hobe open and closing hours er upor base kore.
export const generateTimeSlots = (
  open: string,
  close: string,
  selectedDate: string
): string[] => {
  const slots: string[] = [];
  const openTime = moment.tz(
    `${selectedDate} ${open.slice(0, 2)}:${open.slice(2)}`,
    'YYYY-MM-DD HH:mm',
    'Europe/Helsinki'
  );
  const closeTime = moment.tz(
    `${selectedDate} ${close.slice(0, 2)}:${close.slice(2)}`,
    'YYYY-MM-DD HH:mm',
    'Europe/Helsinki'
  );

  // Get today's date in YYYY-MM-DD format
  const todayDate = moment.tz('Europe/Helsinki').format('YYYY-MM-DD');
  // const todayDate = today.toISOString().split('T')[0];

  // Get the current time in HHMM format
  const now = moment.tz('Europe/Helsinki');
  let currentSlotTime = openTime.clone();

  while (currentSlotTime.isBefore(closeTime)) {
    const slot = currentSlotTime.format('HHmm');
    if (selectedDate === todayDate) {
      if (currentSlotTime.isSameOrAfter(now)) {
        slots.push(slot);
      }
    } else {
      slots.push(slot);
    }
    currentSlotTime.add(30, 'minutes');
  }

  return slots;
};

export const filterAvailableSlots = (
  slots: string[],
  bookings: IBooking[],
  facilities: mongoose.Types.ObjectId[]
): string[] => {
  const slotDuration = 60; // Minimum required slot duration
  const validSlots: string[] = [];

  slots.forEach((slot) => {
    const slotStart = parseInt(slot);
    const slotEnd = slotStart + slotDuration; // Check if the next hour is free

    // Check if any facility is available for this full 60-minute slot
    const isSlotAvailable = facilities.some((facilityId) => {
      const isFullyAvailable = bookings.every((booking) => {
        const bookingStart = parseInt(booking.startTime);
        const bookingEnd = parseInt(booking.endTime);

        // If this facility is booked during ANY part of the slot, it's not available
        return !(
          booking.facility.equals(facilityId) &&
          !(slotEnd <= bookingStart || slotStart >= bookingEnd) // Overlapping booking
        );
      });

      return isFullyAvailable; // Facility must be completely free for the full 60 minutes
    });

    if (isSlotAvailable) {
      validSlots.push(slot);
    }
  });

  return validSlots;
};



// Function to add minutes to a time string (hh:mm)
export const addMinutes = (time: string, minutes: number): string => {
  let hour = parseInt(time.slice(0, 2));
  let minute = parseInt(time.slice(2));

  minute += minutes;

  if (minute >= 60) {
    hour += Math.floor(minute / 60);
    minute %= 60;
  }

  return `${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}`;
};

//Important: Do not delete this. Delete end of the project.
// // Check if the slot overlaps with the booking for this facility
// return (
//   booking.facility.equals(facilityId) &&
//   ((parseInt(slot) >= parseInt(bookingStart) && parseInt(slot) < parseInt(bookingEnd)) ||
//     (parseInt(addMinutes(slot, 30)) > parseInt(bookingStart) && parseInt(slot) < parseInt(bookingStart)))
// );
