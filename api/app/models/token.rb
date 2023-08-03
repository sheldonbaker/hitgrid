class Token < ActiveModelSerializers::Model

  def initialize(attributes)
    super(attributes)
    @created_at = Time.now.getutc
  end

  def encode
    JWT.encode(claims, self.class.secret, self.class.signature_method)
  end

  def self.decode(value)
    begin
      ::HashWithIndifferentAccess.new(JWT.decode(value, self.secret).try(:first))
    rescue JWT::ExpiredSignature => e
      raise e
    rescue JWT::DecodeError
      nil
    end
  end

  protected

  def claim_keys
    [:exp]
  end

  def exp
    (@created_at + ttl).to_i
  end

  def ttl
    5.minutes
  end

  private

  def claims
    Hash[claim_keys.map { |key| [key, self.send(key)] }]
  end

  def self.signature_method
    'HS256'
  end

  def self.secret
    @secret ||= (ENV['JWT_SECRET'] || (raise 'JWT secret not defined'))
  end
end
