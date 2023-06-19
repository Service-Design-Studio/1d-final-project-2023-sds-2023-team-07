class UsersController < ApplicationController
    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:name, :identification_number, :account_balance, :passbook_image_url, :atm_card_image_url, :face_image_url, :fingerprint_data, :singpass_data)
    end
end
  