class AuthenticationController < ApplicationController

    require 'aws-sdk-rekognition'
    require 'base64'

    def face
        image_data = params[:image]
        if image_data.present?
            name, confidence = find_person_using_image('face-id-test', image_data, 90)

            if name
                render json: {message: "Person found: #{name}, Confidence level: #{confidence}"}, status: :ok
            else
                render json: {message: 'No matching person found.'}, status: :unprocessable_entity
            end
        else
            render json: {message: "Nothing received"}, status: :unprocessable_entity
        end
    end

    private

    def find_person_using_image(collection_name, base64_image, thresholdval)
        client = Aws::Rekognition::Client.new

        # remove data:image/png;base64, if it exists and then decode the base64
        image_bytes = Base64.decode64(base64_image.gsub(/^data:image\/\w+;base64,/, ''))

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
