import mongoose, { Schema, Document } from 'mongoose';

export interface IFacilityUnit extends Document {
  name: {
    en: string;
    fi: string;
    sv: string;
  };
}

const facilitySchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    fi: { type: String, required: true },
    sv: { type: String, required: true }
  },
});

const FacilityUnit = mongoose.model<IFacilityUnit>(
  'FacilityUnit',
  facilitySchema
);
export default FacilityUnit;
