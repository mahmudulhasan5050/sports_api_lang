import express from 'express';

import {
  allFacilityUnit
} from '../controllers/facilityUnit';

const router = express.Router();

//get all
router.get('/', allFacilityUnit);


//create facilityUnit
// router.post(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   adminAuthMiddleware,
//   createFacilityUnit
// );
 
//update one facilityUnit
// router.post(
//   '/:facilityUnitId',
//   passport.authenticate('jwt', { session: false }),
//   adminAuthMiddleware,
//   updateFacilityUnit
// );

//get facilityUnit by id
// router.get(
//   '/:facilityUnitName',
//   getFacilityUnitByName
// );

export default router;
