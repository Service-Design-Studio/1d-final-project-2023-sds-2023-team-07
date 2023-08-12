class User < ApplicationRecord
    has_many :transactions

    # Other validations and methods
    validates :balance, numericality: { greater_than_or_equal_to: 0 }
    
    # Ensure pin is a 4-digit string
    validates :pin, length: { is: 4 }, format: { with: /\A\d{4}\z/, message: "must be a 4-digit number" }

    def authenticate_pin(pin)
        self.pin == pin
    end

    def authenticate_face(base64_image)
        identification_number_aws, _confidence = RekognitionService.find_person_by_image('face-id-test', base64_image, 90)
        self.identification_number == identification_number_aws
    end
end
