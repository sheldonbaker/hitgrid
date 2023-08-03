class NewsItemSerializer < ApplicationSerializer
  attributes :key, :reporter, :payload, :created_at
  belongs_to :trade_deadline

  attributes :created_at
end
