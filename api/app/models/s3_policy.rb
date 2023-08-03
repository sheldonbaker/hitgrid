class S3Policy
  include ActiveModel::Model
  include ActiveModel::Serialization

  def expiration
    Time.now.utc + 1.day
  end

  def aws_access_key_id
    ENV['AWS_ACCESS_KEY_ID']
  end

  def bucket
    ENV['TMP_PICTURES_BUCKET']
  end

  def key
    'tmp/${filename}'
  end

  def acl
    'private'
  end

  def content_type
    nil
  end

  def content_type_starts_with
    'image/'
  end

  def policy
    value
  end

  def value
    require 'base64'
    Base64.encode64(raw_value.to_json).gsub("\n", "")
  end

  def signature
    require 'openssl'
    require 'base64'

    secret = ENV['AWS_SECRET_ACCESS_KEY']

    digest = OpenSSL::Digest.new('sha1')
    signature = OpenSSL::HMAC.digest(digest, secret, value)

    Base64.encode64(signature).gsub("\n", "")
  end

  private

  def raw_value
    @raw_value ||= {
      expiration: expiration.iso8601,
      conditions: [
        [ 'starts-with', '$key', 'tmp/'],
        { bucket: bucket },
        { acl: acl },
        ["starts-with", "$Content-Type", content_type_starts_with],
        ["content-length-range", 0, 5.megabytes]
      ]
    }
  end
end