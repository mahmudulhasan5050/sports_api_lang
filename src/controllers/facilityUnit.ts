import { Request, Response, NextFunction } from 'express';
import facilityUnitServices from '../services/facilityUnit';

import FacilityUnit from '../models/FacilityUnit';
import {
  AlreadyExistError,
  BadRequestError,
  ForbiddenError,
} from '../apiErrors/apiErrors';

//get all facilities
export const allFacilityUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const findAllFacilityUnit = await facilityUnitServices.allFacilityUnits();
   //Take only type object from Facility
    const makeAList= [...new Set(findAllFacilityUnit
    .map((item) => item.type))]
    //Remove repeated objects
    const uniqueArray = makeAList.filter(
      (item, index, self) => index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
    );
    res.status(200).json(uniqueArray);
  } catch (error) {
    next(new BadRequestError('Invalid Request', error));
  }
};

//create facility
export const createFacilityUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    //make lower case
    const nameToLowerCaseEn = name.en.toLowerCase();
    const nameToLowerCaseFi = name.fi.toLowerCase();
    const nameToLowerCaseSv = name.sv.toLowerCase();

    // check existance
    const isExist = await FacilityUnit.findOne({ nameToLowerCaseEn });
    if (isExist) throw new AlreadyExistError();

    //create new facility according to user input
    const newFacilityUnit = new FacilityUnit({
      name: {
        en: nameToLowerCaseEn,
        fi: nameToLowerCaseFi,
        sv: nameToLowerCaseSv,
      },
    });
    // call service function to save in database
    const createSuccess = await facilityUnitServices.createFacilityUnit(
      newFacilityUnit
    );
    res.status(200).json(createSuccess);
  } catch (error) {
    if (error instanceof AlreadyExistError) {
      next(error);
    } else {
      next(new BadRequestError('Cannot create facility unit name', error));
    }
  }
};

//update ficility
export const updateFacilityUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get id from params
    const facilityUnitId = req.params.facilityUnitId;
    //get updated info from body
    const { name } = req.body;

    //make lower case
    name.en.toLowerCase();
    name.fi.toLowerCase();
    name.sv.toLowerCase();

    const updateSuccess = await facilityUnitServices.updateFacilityUnit(
      facilityUnitId,
      name
    );

    res.status(204).json(updateSuccess);
  } catch (error) {
    next(new ForbiddenError('Can not update', error));
  }
};

export const getFacilityUnitByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get id from params
    const facilityUnitName = req.params.facilityUnitName;

    const successFacilityUnit = await facilityUnitServices.getFacilityUnitByName(facilityUnitName);
    res.status(200).json(successFacilityUnit);
  } catch (error) {
    next(new BadRequestError('Can not delete.....', error));
  }
};
