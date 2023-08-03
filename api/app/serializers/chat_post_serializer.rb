class ChatPostSerializer < ApplicationSerializer
  belongs_to :trade_deadline
  belongs_to :team

  attributes :body, :created_at
end
