import React from 'react';
import AssetCard from "@/library/components/molecules/asset-card";
import { Asset } from '@/library/types/type';

interface AssetListProps {
  assets: Asset[];
}

const AssetList: React.FC<AssetListProps> = ({ assets }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow mx-4 lg:gap-16">
    {assets.map((asset: Asset) => (
      <AssetCard
      key={asset.asset_number}
      AssetType={asset.asset_type as "vehicle" | "hotel"}
      AssetName={asset.asset_name}
      NumberOfRooms={asset.sub_asset_count.toString()}
      AssetNumber={asset.asset_number}
      location={asset.location}
      details={asset.details}
      account_number={asset.account_number}
      bank={asset.bank}
      />
    ))}
  </div>
);

export default AssetList;