class AccessToken < Token
  attr_accessor :user

  def user_id
    user.id
  end

  protected

  def claim_keys
    super + [:user_id]
  end

  # TODO - reduce this when we have built a token expiry mechanism for the front-end
  def ttl
    2.months + 12.hours # half day to sometimes prevent expiry at worst possible time
  end
end