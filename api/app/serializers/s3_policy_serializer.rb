class S3PolicySerializer < ApplicationSerializer
  attributes :id, :key, :bucket, :acl
  attributes :aws_access_key_id, :content_type
  attributes :policy, :signature

  def id
    object.policy
  end
end