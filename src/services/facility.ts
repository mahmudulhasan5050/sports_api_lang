import { NotFoundError } from '../apiErrors/apiErrors';
import Facility, { IFacility } from '../models/Facility';

//get all
const allFacilities = async () => {
  return await Facility.find(); 
  // return facilities.map((facility) => ({
  //   ...facility,
  //   type: facility.type[language],
  // }));
};
//get by id
const getFacilityById = async (facilityId: string) => {
  return await Facility.findById(facilityId);
};

//create
const createFacility = async (newFacility: IFacility) => {
  const saveFacility = await newFacility.save();
  return saveFacility;
};

//update
const updateFacility = async (
  facilityId: string,
  updatedFacilityFromBody: IFacility
) => {
  const findAndUpdate = await Facility.findByIdAndUpdate(
    facilityId,
    updatedFacilityFromBody,
    { new: true }
  );
  if (!findAndUpdate)
    throw new NotFoundError('Can not update facility information!!');
  return findAndUpdate;
};

export default {
  allFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
};
