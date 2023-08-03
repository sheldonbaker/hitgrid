class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token

  include Pundit
  include ActionController::Serialization

  serialization_scope :serialization_scope

  before_action :verify_content_type
  before_action :authenticate

  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def sort_scope(scope, map = {})
    key = params[:sort].sub(/^\-/, '')
    key = map[key] if map.has_key?(key)

    scope.order(key + (params[:sort].first == '-' ? " DESC" : ""))
  end

  def render(options)
    super(options.merge(content_type: 'application/vnd.api+json; ext="hitgrid/embedded"; supported-ext="hitgrid/embedded";'))
  end

  protected

  def pundit_user
    current_token
  end

  def serialization_scope
    current_profile
  end

  protected

  def current_token
    @current_token
  end

  def current_user
    @current_user ||= User.find_by_id(@current_token[:user_id]) if @current_token
  end

  def current_profile
    @current_profile ||= current_user.try(:profile)
  end

  def anonymous_id
    @anonymous_id
  end

  protected

  def permitted_attributes(object, options = {})
    ActionController::Parameters.new(parsed_params(options)).permit(*policy(object).permitted_attributes(params[:action]))
  end

  def parsed_params(options = {})
    ActiveModel::Serializer::Adapter::JsonApi::Deserialization.parse(params, options.merge(exts: @exts))
  end

  def format_errors(obj)
    errors = obj.errors
    keys = errors.keys

    mapped = keys.map do |key|
      if (obj.try(:attributes) || {}).has_key?(key.to_s)
        pointer = 'data/attributes/' + key.to_s
      end

      {
        detail: errors.full_messages_for(key).first,
        source: {
          pointer: pointer 
        }
      }
    end

    { errors: mapped }
  end

  private

  def verify_content_type
    header = request.headers['Content-Type']
    parts = header.split(';').map &:strip
    content_type = parts.first

    if content_type == 'application/vnd.api+json'
      opts = parts[1..-1].map do |part|
        opt_parts = part.split('=')
        [opt_parts.first, opt_parts.last.split(',')]
      end

      @exts = Hash[opts]['ext']
    else
      head :bad_request
    end
  end

  def authenticate
    token_and_options = token_and_options(request)
    token = token_and_options.try(:first)
    options = token_and_options.try(:last)

    if token
      @current_token = AccessToken.decode(token)
    elsif options
      @anonymous_id = options[:anonymous_id]
    else
      # TODO
    end
  end
end
