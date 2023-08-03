class AssetSerializer < ApplicationSerializer
  has_one :assetable
  naive_belongs_to :club
end
