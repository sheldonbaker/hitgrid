class CommentSerializer < ApplicationSerializer
  attributes :body
  naive_belongs_to :profile

  naive_belongs_to :team
  naive_belongs_to :trade_deadline

  naive_belongs_to :commentable

  attributes :created_at
end
