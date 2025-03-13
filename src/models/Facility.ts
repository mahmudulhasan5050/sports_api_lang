import mongoose, { Document } from 'mongoose';

export interface IFacility extends Document {
  type: {
    en: string;
    fi: string;
    sv: string;
  };
  courtNumber: number;
  pricePerHour: number;
  isActive: boolean;
}

const facilitySchema = new mongoose.Schema({
  type: {
    en: { type: String, required: true },
    fi: { type: String, required: true },
    sv: { type: String, required: true },
  },
  courtNumber: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  isActive: { type: Boolean, requered: true, default: true },
});

const Facility = mongoose.model<IFacility>('Facility', facilitySchema);
export default Facility;
