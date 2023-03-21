export interface IApplicationsStorage {
  applications: Array<IApplicationStorage>;
}

export interface IApplicationStorage {
  id: number;
  type?: string | undefined;
  amount_requested?: number | undefined;
  status?: string | undefined;
  product_id?: number | undefined;
  farmer_id?: number | undefined;
}

export interface IFarmersStorage {
  farmers: Array<IFarmerStorage>;
}

export interface IFarmerStorage {
  id: number;
  name?: string | undefined;
  age?: number | undefined;
  phone_number?: string | undefined;
  farm_id?: number | undefined;
}
