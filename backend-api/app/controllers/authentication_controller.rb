class AuthenticationController < ApplicationController

    def face
        image_data = params[:image]
        if image_data.present?
            puts image_data
            render json: {message: "Success"}, status: :ok
        else
            render json: {message: "Nothing received"}, status: :unprocessable_entity
        end
    end
end