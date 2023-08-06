class ApplicationController < ActionController::API
    include ActionController::Cookies
  
    before_action :set_current_user

  
    def logged_in?
      !!@current_user
    end
  
    private
  
    def set_current_user
      @current_user = User.find_by(id: session[:user_id])
    end
end
  
