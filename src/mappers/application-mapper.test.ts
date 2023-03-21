import { IApplication, IApplicationRest } from '../types/rest';
import { IApplicationStorage } from '../types/storage';
import { mapRestToStorage, mapStorageToRest } from './application-mapper';

const applicationStorage: IApplicationStorage = {
  id: 123,
  amount_requested: 1,
  farmer_id: 1234,
  product_id: 3456,
  status: 'declined',
  type: 'someType',
};

const applicationRest: IApplication = {
  id: 123,
  amountRequested: 1,
  farmerId: 1234,
  productId: 3456,
  status: 'declined',
  type: 'someType',
};

describe('map application', () => {
  test('map Rest to Storage', () => {
    expect(mapRestToStorage(applicationRest)).toStrictEqual(applicationStorage);
  });

  test('map Storage to Rest', () => {
    expect(mapStorageToRest(applicationStorage)).toStrictEqual(applicationRest);
  });
});
