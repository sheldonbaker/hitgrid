class ActivitySerializer < ApplicationSerializer
  attributes :id, :key, :featured, :image_url, :payload

  has_one :trade_deadline
end
