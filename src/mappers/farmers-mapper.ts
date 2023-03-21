import { IFarmerRest } from '../types/rest';
import { IFarmerStorage } from '../types/storage';

export const mapFarmersStorageToRest = (farmer: IFarmerStorage): IFarmerRest => {
  const { id, name, age, phone_number: phoneNumber, farm_id: farmId } = farmer;

  const restFarmer: IFarmerRest = {
    id,
    name,
    age,
    phoneNumber,
    farmId,
  };
  return restFarmer;
};

export const mapFarmerRestToStorage = (farmer: IFarmerRest): IFarmerStorage => {
  const { id, name, age, phoneNumber, farmId } = farmer;

  const storageFarmer: IFarmerStorage = {
    id: <number>id,
    name: <string>name,
    age: <number>age,
    phone_number: <string>phoneNumber,
    farm_id: <number>farmId,
  };

  return storageFarmer;
};
