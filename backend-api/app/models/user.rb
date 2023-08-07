class User < ApplicationRecord
    has_many :transactions
  
    # Other validations and methods
    validates :is_active, numericality: { only_integer: true }

    def authenticate_pin(pin)
        self.pin == pin
    end

    def authenticate_face(base64_image)
        identification_number_aws, _confidence = find_person_using_image('face-id-test', base64_image, 90)
        self.identification_number == identification_number_aws
    end

    private
    def find_person_using_image(collection_name, base64_image, thresholdval)
        client = Aws::Rekognition::Client.new
    
        # remove data:image/png;base64, if it exists and then decode the base64
        image_bytes = Base64.decode64(base64_image.gsub('data:image/jpeg;base64,', ''))
    
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