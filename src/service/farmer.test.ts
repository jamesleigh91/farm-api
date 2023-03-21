const storageFarmer: IFarmerStorage = {
  id: 123,
  age: 34,
  farm_id: 1234,
  name: "James",
  phone_number: "3343"
};

const restFarmer: IFarmerRest = {
  id: 123,
  age: 34,
  farmId: 1234,
  name: "James",
  phoneNumber: "3343"
};

const farmerStorage = {
  farmers: [storageFarmer],
};

const restFarmers = {
  farmers: [restFarmer],
};

const retrieveFarmers = jest.fn();
const deleteFarmer = jest.fn();
const getFarmerById = jest.fn();
const createFarmerStorage = jest.fn();

jest.mock('../storage/local', () => ({
  retrieveFarmers,
  deleteFarmer,
  getFarmerById,
  createFarmerStorage,
}));

import { IFarmerRest } from '../types/rest';
import { IFarmerStorage } from '../types/storage';
import {
  createFarmer,
  deleteFarmerById,
  getFarmers
} from './farmer';

describe('get Farmers', () => {
  test('returns list of applications', () => {
    retrieveFarmers.mockReturnValue(farmerStorage);
    expect(getFarmers({})).toStrictEqual(restFarmers);
    expect(retrieveFarmers).toBeCalledTimes(1);
  });
});

describe('delete Farmer', () => {
  test('delete farmer if it exists', () => {
    const farmerId = 123;
    getFarmerById.mockReturnValue(storageFarmer);

    const message = deleteFarmerById(farmerId);

    expect(message).toEqual({
      message: 'Farmer Successfully deleted',
    });
    expect(deleteFarmer).toBeCalledWith(farmerId);
  });

  test('throw error when farmer does not exist', () => {
    const applicationId = 123;
    getFarmerById.mockReturnValue(null);

    try {
      deleteFarmerById(applicationId);
      fail;
    } catch (err) {
      expect(deleteFarmer).not.toBeCalled();
      expect(err.message).toBe('Farmer does not exists');
    }
  });
});

describe('createFarmer', () => {
  test('create farmer if does not exists', () => {
    getFarmerById.mockReturnValue(null);

    const createdApplication = createFarmer(restFarmer);

    expect(createdApplication).toStrictEqual(restFarmer);

    expect(createFarmerStorage).toBeCalledWith(storageFarmer);
    expect(createFarmerStorage).toBeCalledTimes(1);
  });

  test('throw error when farmer already exists', () => {
    const applicationId = 123;
    getFarmerById.mockReturnValue(storageFarmer);

    try {
      createFarmer(restFarmer);
      fail;
    } catch (err) {
      expect(createFarmerStorage).not.toBeCalled();
      expect(err.message).toBe('Farmer already exists');
    }
  });
});
