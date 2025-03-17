import { NotFoundError } from '../apiErrors/apiErrors';
import Facility from '../models/Facility';
import FacilityUnit, { IFacilityUnit } from '../models/FacilityUnit';

//get all
const allFacilityUnits = async () => {
  return await Facility.find();
};

// //create
// const createFacilityUnit = async (newFacilityUnit: IFacilityUnit) => {
//   const saveFacilityUnit = await newFacilityUnit.save();
//   return saveFacilityUnit;
// };

//update
// const updateFacilityUnit = async (
//   facilityUnitId: string,
//   updatedFacilityUnitFromBody: string
// ) => {
//   const findAndUpdate = await FacilityUnit.findByIdAndUpdate(
//     facilityUnitId,
//     { name: updatedFacilityUnitFromBody },
//     { new: true }
//   );
//   if (!findAndUpdate)
//     throw new NotFoundError('Can not update facilityUnit information!!');
//   return findAndUpdate;
// };

//delete
// const getFacilityUnitByName = async (facilityUnitName: string) => {
//   const facility = await Facility.findOne({
//     $or: [
//       { "type.en": facilityUnitName },
//       { "type.fi": facilityUnitName },
//       { "type.sv": facilityUnitName }
//     ]
//   });

//   if (!facility)
//     throw new NotFoundError('FacilityUnit is not found');
//   return facility.type;
// };

export default {
  allFacilityUnits
};
