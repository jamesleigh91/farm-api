import { IApplication, IApplicationRest } from '../types/rest';
import {
  deleteApplication,
  retrieveApplictions,
  createItem,
  getApplicationById,
} from '../storage/local';
import { mapRestToStorage, mapStorageToRest } from '../mappers/application-mapper';
import { IApplicationStorage } from '../types/storage';
import { IResponse } from '../types/response';

export const getApplications = (queryParams: any): IApplicationRest => {
  const dbApplications = retrieveApplictions(queryParams);

  const restApplications = dbApplications.applications.map((farm) => {
    return mapStorageToRest(farm);
  });

  return { applications: restApplications };
};

export const deleteApplicationById = (farmId: number): IResponse => {
  const storageApplication: IApplicationStorage = getApplicationById(farmId);

  if (storageApplication) {
    deleteApplication(farmId);
    return {
      message: 'Application Successfully deleted',
    };
  } else {
    throw new Error('Application does not exists');
  }
};

export const createApplication = (farm: IApplication): IApplication => {
  const storageFarm: IApplicationStorage = getApplicationById(<number>farm.id);

  if (storageFarm) {
    throw new Error('Application already exists');
  } else {
    createItem(mapRestToStorage(farm));
    return farm;
  }
};

export const updateApplication = (farm: IApplication, farmId: number): IApplication => {
  const storageFarm: IApplicationStorage = getApplicationById(farmId);

  if (!storageFarm) {
    throw new Error('Farm does not exist, so cannot be updated');
  } else {
    deleteApplication(farmId);
    createItem(mapRestToStorage(farm));
    return farm;
  }
};
