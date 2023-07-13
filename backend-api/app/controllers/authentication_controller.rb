class AuthenticationController < ApplicationController

    require 'aws-sdk-rekognition'
    require 'base64'

    def face
        image_data = params[:image]
        param_name = params[:name]
        if image_data.present? && param_name.present?
            name, confidence = find_person_using_image('face-id-test', image_data, 90)

            if param_name == name
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
        param_name = params[:name]
        if pin_data.present? && param_name.present?
            user = User.find_by(pin: pin_data)
    
            if user && user.name == param_name
                render json: {authenticated: true, message: "No issues"}, status: :ok
            else
                render json: {authenticated: false, message: "Pin authentication failed"}, status: :ok
            end
        else
            render json: {authenticated: false, message: "Server error"}, status: :unprocessable_entity
        end
    end
    

    private

    def find_person_using_image(collection_name, base64_image, thresholdval)
        client = Aws::Rekognition::Client.new

        # remove data:image/png;base64, if it exists and then decode the base64
        image_bytes = Base64.decode64(base64_image.gsub(/^,data:image\/\w+;base64/, ''))

        response = client.search_faces_by_image(
            collection_id: collection_name,
            face_match_threshold: thresholdval,
            image: { bytes: image_bytes },
            max_faces: 1
        )

        if response.face_matches.any?
            name = response.face_matches[0].face.external_image_id
            confidence = response.face_matches[0].similarity
            return name, confidence
        end

        return nil, nil
    end
end
