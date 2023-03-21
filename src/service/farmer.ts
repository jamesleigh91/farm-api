import {
  getFarmerById,
  retrieveFarmers,
  createFarmerStorage,
  deleteFarmer,
} from '../storage/local';
import { IFarmerRest, IFarmersRest } from '../types/rest';
import { mapFarmerRestToStorage, mapFarmersStorageToRest } from '../mappers/farmers-mapper';
import { IFarmerStorage } from '../types/storage';
import { IResponse } from '../types/response';

export const getFarmers = (queryParams: any): IFarmersRest => {
  const dbFarms = retrieveFarmers(queryParams);

  const restFarmers = dbFarms.farmers.map((farm) => {
    return mapFarmersStorageToRest(farm);
  });

  return { farmers: restFarmers };
};

export const createFarmer = (farmer: IFarmerRest): IFarmerRest => {
  const storageFarmer: IFarmerStorage = getFarmerById(<number>farmer.id);

  console.log('here');

  if (storageFarmer) {
    throw new Error('Farmer already exists');
  } else {
    createFarmerStorage(mapFarmerRestToStorage(farmer));
    return farmer;
  }
};

export const deleteFarmerById = (farmerId: number): IResponse => {
  const storageFarmer: IFarmerStorage = getFarmerById(farmerId);

  if (storageFarmer) {
    deleteFarmer(farmerId);
    return {
      message: 'Farmer Successfully deleted',
    };
  } else {
    throw new Error('Farmer does not exists');
  }
};
