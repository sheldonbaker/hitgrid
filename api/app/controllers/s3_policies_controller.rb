class S3PoliciesController < ApplicationController
  def create
    authorize :s3_policy
    @s3_policy = S3Policy.new

    render json: @s3_policy, status: :created
  end
end
