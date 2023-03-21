import farms from './data.json';

const application: Array<IApplicationStorage> = farms.application;
const farmers: Array<IFarmerStorage> = farms.farmer;

import {
  getFarmerById,
  retrieveFarmers,
  createFarmerStorage,
  deleteFarmer,
  createItem,
  deleteApplication,
  getApplicationById,
  retrieveApplictions,
  getApplicationCount,
} from '../storage/local';
import { IApplicationStorage, IFarmerStorage } from '../types/storage';

const storageFarmer: IFarmerStorage = {
  id: 123,
  age: 34,
  farm_id: 1234,
  name: 'James',
  phone_number: '3343',
};

const storageApplication = {
  id: 123,
  amount_requested: 1,
  farmer_id: 1234,
  product_id: 3456,
  status: 'declined',
  type: 'someType',
};

describe('getFarmerById', () => {
  test('returns farmer if it exists', () => {
    const farmerId = 1880293;
    const farmer = getFarmerById(farmerId);
    expect(farmer.id).toBe(farmerId);
  });

  test('returns null if it does not exists', () => {
    const farmerId = 1;
    const farmer = getFarmerById(farmerId);
    expect(farmer).toBe(undefined);
  });
});

describe('createFarmerStorage', () => {
  test('to create farmer', () => {
    const farmer = createFarmerStorage(storageFarmer);
    expect(farmer.id).toBe(storageFarmer.id);
  });
});

describe('getApplicationById', () => {
  test('returns application if it exists', () => {
    const applicationId = 1052768;
    const application = getApplicationById(applicationId);
    expect(application.id).toBe(applicationId);
  });

  test('returns null if application does not exists', () => {
    const applicationId = 1;
    const application = getApplicationById(applicationId);
    expect(application).toBe(undefined);
  });
});

describe('createApplication', () => {
  test('to create application', () => {
    const application = createItem(storageApplication);
    expect(application.id).toBe(storageApplication.id);
  });
});

describe('deleteFarmer', () => {
  test('to delete Farmer without error', () => {
    const farmerId = 1945189;
    deleteFarmer(farmerId);
  });
});

describe('getApplicationCount', () => {
  test('to return count without error', () => {
    expect(getApplicationCount()).toBe(251);
  });
});

describe('retrieveFarmers', () => {
  test('to return all farmers', () => {
    expect(retrieveFarmers({})).toEqual({ farmers });
  });
});

describe('retrieveApplications', () => {
  test('to use default page size', () => {
    const { applications } = retrieveApplictions({});

    expect(applications.length).toBe(30);
  });

  test('to use custom page size', () => {
    const { applications } = retrieveApplictions({ pageSize: 3, type: 'flexi_credit' });

    expect(applications.length).toBe(3);
  });

  test('to use custom page no', () => {
    const { applications } = retrieveApplictions({ pageSize: 3, page: 2, type: 'flexi_credit' });

    expect(applications.length).toBe(3);
  });
});

describe('deleteApplication', () => {
  test('to delete application without error', () => {
    const applicationId = 1052768;
    deleteApplication(applicationId);
  });
});
