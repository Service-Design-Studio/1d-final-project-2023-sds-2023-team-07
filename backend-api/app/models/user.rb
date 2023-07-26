class User < ApplicationRecord
    has_many :transactions
  
    # Other validations and methods
    validates :is_active, numericality: { only_integer: true }
end