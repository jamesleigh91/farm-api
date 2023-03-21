const storageApplication = {
  id: 123,
  amount_requested: 1,
  farmer_id: 1234,
  product_id: 3456,
  status: 'declined',
  type: 'someType',
};

const restApplication = {
  id: 123,
  amountRequested: 1,
  farmerId: 1234,
  productId: 3456,
  status: 'declined',
  type: 'someType',
};

const applicationStorage: IApplicationsStorage = {
  applications: [storageApplication],
};

const restApplications = {
  applications: [restApplication],
};

const retrieveApplictions = jest.fn();
const deleteApplication = jest.fn();
const getApplicationById = jest.fn();
const createItem = jest.fn();

jest.mock('../storage/local', () => ({
  retrieveApplictions,
  deleteApplication,
  getApplicationById,
  createItem,
}));

import { IApplicationsStorage } from '../types/storage';
import {
  createApplication,
  deleteApplicationById,
  getApplications,
  updateApplication,
} from './application';

describe('get Applications', () => {
  test('returns list of applications', () => {
    retrieveApplictions.mockReturnValue(applicationStorage);
    expect(getApplications({})).toStrictEqual(restApplications);
    expect(retrieveApplictions).toBeCalledTimes(1);
  });
});

describe('delete Application', () => {
  test('delete application if it exists', () => {
    const applicationId = 123;
    getApplicationById.mockReturnValue(storageApplication);

    const message = deleteApplicationById(applicationId);

    expect(message).toEqual({
      message: 'Application Successfully deleted',
    });
    expect(deleteApplication).toBeCalledWith(applicationId);
  });

  test('throw error when application does not exist', () => {
    const applicationId = 123;
    getApplicationById.mockReturnValue(null);

    try {
      deleteApplicationById(applicationId);
      fail;
    } catch (err) {
      expect(deleteApplication).not.toBeCalled();
      expect(err.message).toBe('Application does not exists');
    }
  });
});

describe('createApplication', () => {
  test('create application if does not exists', () => {
    getApplicationById.mockReturnValue(null);

    const createdApplication = createApplication(restApplication);

    expect(createdApplication).toStrictEqual(restApplication);

    expect(createItem).toBeCalledWith(storageApplication);
    expect(createItem).toBeCalledTimes(1);
  });

  test('throw error when application already exists', () => {
    const applicationId = 123;
    getApplicationById.mockReturnValue(storageApplication);

    try {
      createApplication(restApplication);
      fail;
    } catch (err) {
      expect(createItem).not.toBeCalled();
      expect(err.message).toBe('Application already exists');
    }
  });
});

describe('UpdateApplication', () => {
  test('create application if does not exists', () => {
    const applicationId = 123;
    getApplicationById.mockReturnValue(storageApplication);

    const updatedFarm = updateApplication(restApplication, applicationId);

    expect(updatedFarm).toStrictEqual(restApplication);

    expect(createItem).toBeCalledWith(storageApplication);
    expect(deleteApplication).toBeCalledWith(applicationId);
  });

  test('throw error if application does not exists', () => {
    const applicationId = 123;
    getApplicationById.mockReturnValue(null);

    try {
      updateApplication(restApplication, applicationId);
      fail;
    } catch (err) {
      expect(createItem).not.toBeCalled();
      expect(deleteApplication).not.toBeCalled();
      expect(err.message).toBe('Farm does not exist, so cannot be updated');
    }
  });
});
