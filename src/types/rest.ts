export interface IApplicationRest {
  applications: Array<IApplication>;
}

export interface IApplication {
  id: Number;
  type?: String | undefined;
  amountRequested?: Number | undefined;
  status?: String | undefined;
  productId?: Number | undefined;
  farmerId?: Number | undefined;
}


export interface IParams {
  params: IId;
  id: Number;
}

export interface IQueryParams {
  pageSize?: Number;
  page?: Number;
  type?: String;
  amountRequested?: Number;
  status?: String;
  productId?: Number;
  farmerId?: Number;
  numCows?: Number;
  numChickens?: Number;
  num_pigs?: Number;
  acresFarmed?: Number;
  name?: String;
}

export interface IFarmersRest {
  farmers: Array<IFarmerRest>;
}

export interface IFarmerRest {
  id: Number,
  name?: String | undefined,
  age?: Number | undefined,
  phoneNumber?: String | undefined,
  farmId?: Number | undefined,
}

export interface IId {
  id: number;
}
// numCows?: Number | undefined;
// numChickens?: Number | undefined;
// NumPigs?: Number | undefined;
// acresFarmed?: Number | undefined;
// name?: String | undefined;