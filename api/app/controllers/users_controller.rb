class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    authorize @user

    render json: @user, include: 'profile'
  end

  def create
    factory = UserFactory.new(permitted_attributes(:user))
    authorize factory.user
  
    if factory.execute
      render json: factory.user, include: 'profile', status: :created
    else
      render json: format_errors(factory.user), status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    authorize @user

    if @user.update_attributes(permitted_attributes(@user))
      render json: @user, include: 'profile', status: :ok
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end
end
