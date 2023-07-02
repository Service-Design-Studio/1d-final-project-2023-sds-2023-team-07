class User < ApplicationRecord
    has_many :transactions
  
    # Other validations and methods
end