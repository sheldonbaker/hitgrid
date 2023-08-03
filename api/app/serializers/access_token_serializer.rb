class AccessTokenSerializer < ApplicationSerializer
  attributes :id

  def id
    object.encode
  end
end
