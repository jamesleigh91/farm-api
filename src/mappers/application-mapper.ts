import { IApplication } from '../types/rest';
import { IApplicationStorage } from '../types/storage';

export const mapStorageToRest = (application: IApplicationStorage): IApplication => {
  const {
    type,
    status,
    amount_requested: amountRequested,
    product_id: productId,
    farmer_id: farmerId,
  } = application;

  const restFarm: IApplication = {
    id: application.id,
    type,
    amountRequested,
    status,
    productId,
    farmerId,
  };
  return restFarm;
};

export const mapRestToStorage = (application: IApplication): IApplicationStorage => {
  const {
    type,
    status,
    amountRequested: amount_requested,
    productId: product_id,
    farmerId: farmer_id,
  } = application;

  const storageFarm: IApplicationStorage = {
    id: <number>application.id,
    type: <string>type,
    amount_requested: <number>amount_requested,
    status: <string>status,
    product_id: <number>product_id,
    farmer_id: <number>farmer_id,
  };

  return storageFarm;
};
