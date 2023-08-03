class NegotiableAssetableSerializer < ApplicationSerializer
  has_one :negotiable
  has_one :assetable
  has_one :team

  attributes :retained, :retention_pct
end
