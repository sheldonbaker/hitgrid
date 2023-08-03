class ProfileSerializer < ApplicationSerializer
  attributes :id, :handle, :suggested_handle, :published
  attributes :temp_picture_url, :picture_url
  attributes :created_at

  belongs_to :favourite_club
  has_many :teams
end
