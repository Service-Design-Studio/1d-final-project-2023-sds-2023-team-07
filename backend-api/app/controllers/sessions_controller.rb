class SessionsController < ApplicationController
    # POST '/login' - Log in a user
    def create
        @user = User.find_by(identification_number: params[:identification_number])
        puts @user
        puts params[:pin]
        puts @user.authenticate_pin(params[:pin])

        # If the user exists and the provided pin or face image match the user's pin or face, 
        # store the user's id in the session and return a JSON response indicating that the user is logged in
        if (@user && params[:pin] && @user.authenticate_pin(params[:pin])) || 
            (@user && params[:image] && @user.authenticate_face(params[:image]))
            session[:user_id] = @user.id
            render json: { logged_in: true, user: @user }
        else
          # If the user does not exist or the provided pin or face image does not match the user's, 
          # return a JSON response indicating that the user is not logged in
            render json: { logged_in: false }
        end
    end
        
    # DELETE '/logout' - Log out a user
    def destroy
      # Clear the session and return a JSON response indicating that the user is not logged in
      reset_session
      render json: { logged_in: false }
    end
  
    # GET '/logged' - Check if a user is logged in
    def is_logged
      # If a user is currently logged in, return a JSON response indicating that the user is logged in and include the user's data
      if @current_user
        render json: { logged_in: true, user: @current_user }
      else
        # If no user is logged in, return a JSON response indicating that the user is not logged in
        render json: { logged_in: false }
      end
    end
end
  