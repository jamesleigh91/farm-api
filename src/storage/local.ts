import { IQueryParams } from '../types/rest';
import {
  IApplicationsStorage,
  IApplicationStorage,
  IFarmersStorage,
  IFarmerStorage,
} from '../types/storage';
import farms from './data.json';

const application: Array<IApplicationStorage> = farms.application;
const farmers: Array<IFarmerStorage> = farms.farmer;

export const retrieveApplictions = (queryParams: IQueryParams): IApplicationsStorage => {
  const paramsKeys = Object.keys(queryParams);
  const paramsValues = Object.values(queryParams);

  let applications = [];
  let queryableKeys = [];
  let queryableValues = [];
  let paginationKeys = [];
  let paginationValues = [];

  for (let param = 0; param < paramsKeys.length; param++) {
    if (paramsKeys[param] !== 'pageSize' && paramsKeys[param] !== 'page') {
      queryableKeys.push(paramsKeys[param]);
      queryableValues.push([paramsValues[param]]);
    } else {
      paginationKeys.push(paramsKeys[param]);
      paginationValues.push([paramsValues[param]]);
    }
  }

  console.log('paginationKeys: ' + paginationKeys + ' paginationValues: ' + paginationValues);
  console.log('queryableKeys + : ' + queryableKeys + ' queryableValues: ' + queryableValues);

  // if (paramsKeys.length > 0) {
  application.map((app) => {
    let add = false;
    if (queryableKeys.length > 0) {
      for (let param = 0; param < queryableKeys.length; param++) {
        if (app[queryableKeys[param]] == queryableValues[param]) {
          add = true;
        }
      }
      if (add) {
        applications.push(app);
      }
    } else {
      applications = application;
    }
  });

  const pageSize = paginationValues[paginationKeys.indexOf('pageSize')]
    ? paramsValues[paginationKeys.indexOf('pageSize')]
    : 30;
  const page = paginationValues[paginationKeys.indexOf('page')]
    ? paginationValues[paginationKeys.indexOf('page')]
    : 1;

  const startIndex = paginationValues[paramsKeys.indexOf('page')] ? parseInt(pageSize) * page : 1;
  const endIndex = startIndex + parseInt(pageSize);

  return { applications: applications.slice(startIndex, endIndex) };
};

export const retrieveFarmers = (queryParams: IQueryParams): IFarmersStorage => {
  return { farmers: farms.farmer };
};

export const getApplicationCount = (): Number => {
  return application.length;
};

export const deleteApplication = (id: Number): void => {
  const index = farms.application.findIndex((application) => application.id == id);
  console.log('Deleting Application');
  if (index > -1) {
    farms.application.splice(index, 1);
  }

  return;
};

export const deleteFarmer = (id: Number): void => {
  const index = farms.farmer.findIndex((farmer) => farmer.id == id);
  console.log('Deleting Farmer');
  if (index > -1) {
    farms.farmer.splice(index, 1);
  }

  return;
};

export const createItem = (applicationStorage: IApplicationStorage): IApplicationStorage => {
  application.push(applicationStorage);
  return applicationStorage;
};

export const getApplicationById = (farmId: number): IApplicationStorage => {
  return application.find(({ id }) => id == farmId);
};

export const createFarmerStorage = (farmer: IFarmerStorage): IFarmerStorage => {
  farmers.push(farmer);
  return farmer;
};

export const getFarmerById = (farmerId: number): IFarmerStorage => {
  return farmers.find(({ id }) => id == farmerId);
};
