class User < ApplicationRecord
    has_many :transactions

    # Other validations and methods
    validates :is_active, numericality: { only_integer: true }

    def authenticate_pin(pin)
        self.pin == pin
    end

    def authenticate_face(base64_image)
        identification_number_aws, _confidence = RekognitionService.find_person_by_image('face-id-test', base64_image, 90)
        self.identification_number == identification_number_aws
    end
end