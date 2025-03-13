import mongoose from 'mongoose';
import { NotFoundError } from '../apiErrors/apiErrors';
import Booking, { IBooking } from '../models/Booking';
import moment from 'moment-timezone';

// get available time
const getAvailableTime = async(facilityIds:mongoose.Types.ObjectId[],selectedDate:string) =>{
  //IMPORTANT: date:selectedDate might cause error------------------------//////
  const bookings = await Booking.find({
    facility: { $in: facilityIds },
    isCancelled: false, //*************************** */
    date: {
      $gte: moment(selectedDate).startOf('day').toDate(), // Start of the day ($gte- greater than or equal)
      $lt: moment(selectedDate).endOf('day').toDate(),   // End of the day ($lt- less than)
    },
  });
  
  return bookings
}

// get bookings by user
const getUserBooking = async(userId: mongoose.Types.ObjectId) =>{
  try {
    const bookings = await Booking.find({ user: userId }).populate('facility', 'type courtNumber');
    return bookings;
  } catch (error) {
    throw new Error('Error fetching bookings'); // Handle errors appropriately
  }
}

//delete
const cancelBookingByUser = async (booking: IBooking) => {
  
  const deleteFromDatabase = await Booking.findByIdAndUpdate(booking._id, booking, {new: true});
  if (!deleteFromDatabase) throw new NotFoundError('Facility is not found');
  return deleteFromDatabase;
};

export default {
    getAvailableTime,
    getUserBooking,
    cancelBookingByUser
};
