export interface Room {
  id: number;
  room_number: string;
  room_type: string;
  price: number;
  status: boolean;
  hotel: string;
  occupancy: string | number;
}

export interface Transaction {
  name: string;
  amount: string;
  sub_asset_number: string;
  payment_status: string;
  date_time: string;
}

export type AssetType = "vehicle" | "hotel";

export interface Asset {
  asset_number: string;
  asset_type: AssetType;
  asset_name: string;
  location: string;
  created_at: string;
  total_revenue: string;
  details: string;
  account_number: string;
  bank: string;
  user_role: string;
  sub_asset_count: number;
}

export type AssetsResponse = Asset[];

export interface AssetFormData {
  asset_type: AssetType;
  asset_name: string;
  location: string;
  details: string;
  account_number: string;
  bank: string;
}
