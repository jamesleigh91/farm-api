import { IFarmerRest } from '../types/rest';
import { IFarmerStorage } from '../types/storage';
import { mapFarmerRestToStorage, mapFarmersStorageToRest } from './farmers-mapper';

const farmerStorage: IFarmerStorage = {
  id: 34,
  age: 23,
  farm_id: 245,
  name: 'James',
  phone_number: '232312321321',
};

const farmerRest: IFarmerRest = {
  id: 34,
  age: 23,
  farmId: 245,
  name: 'James',
  phoneNumber: '232312321321',
};

describe('map farmer', () => {
  test('map Rest to Storage', () => {
    expect(mapFarmerRestToStorage(farmerRest)).toStrictEqual(farmerStorage);
  });

  test('map Storage to Rest', () => {
    expect(mapFarmersStorageToRest(farmerStorage)).toStrictEqual(farmerRest);
  });
});
