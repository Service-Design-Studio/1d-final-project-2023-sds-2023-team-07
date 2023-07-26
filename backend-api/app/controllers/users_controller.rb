class UsersController < ApplicationController
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

  # GET '/users/:id' - Show details of a specific user
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  # PATCH '/users/:id' - Update a specific user
  # PUT '/users/:id' - Update a specific user
  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE '/users/:id' - Delete a specific user
  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render json: { message: 'User deleted successfully' }, status: :ok
    else
      render json: { errors: 'Failed to delete user' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :identification_number, :balance, :pin, :face_image_url, :is_active)
  end
end
