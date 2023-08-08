class UsersController < ApplicationController
  before_action :set_current_user, only: [:show, :update, :destroy]

  # POST '/users' - Create a new user
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET '/users' - List all users
  def index
    @users = User.all
    render json: @users
  end

  # GET '/user' - Show details of the currently logged-in user
  def show
    render json: @current_user
  end

  # PATCH '/user' or PUT '/user' - Update the currently logged-in user
  def update
    if @current_user.update(user_params)
      render json: @current_user
    else
      render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE '/user' - Delete the currently logged-in user
  def destroy
    if @current_user.destroy
      render json: { message: 'User deleted successfully' }, status: :ok
    else
      render json: { errors: 'Failed to delete user' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :identification_number, :balance, :pin, :face_image_url, :is_active)
  end
  
  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
    unless @current_user
      render json: { error: "Not logged in" }, status: :unauthorized
    end
  end
end
