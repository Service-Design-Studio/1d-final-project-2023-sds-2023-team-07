class AuthenticationController < ApplicationController

    def face
        image_data = params[:image]
        param_identification_number = params[:identification_number]
        if image_data.present? && param_identification_number.present?
            user = User.find_by(identification_number: param_identification_number)

            if user && user.authenticate_face(image_data)
                render json: {authenticated: true, message: "No issues"}, status: :ok
            else
                render json: {authenticated: false, message: "Face authentication failed"}, status: :ok
            end
        else
            render json: {authenticated: false, message: "Server error"}, status: :unprocessable_entity
        end
    end

    def pin
        pin_data = params[:pin]
        param_identification_number = params[:identification_number]
        if pin_data.present? && param_identification_number.present?
            user = User.find_by(identification_number: param_identification_number)
    
            if user && user.authenticate_pin(pin_data)
                render json: {authenticated: true, message: "No issues"}, status: :ok
            else
                render json: {authenticated: false, message: "Pin authentication failed"}, status: :ok
            end
        else
            render json: {authenticated: false, message: "Server error"}, status: :unprocessable_entity
        end
    end
end
