class AtmMachine < ApplicationRecord
    has_many :transactions
  
    # Other validations and methods
    validates :atm_machine_name, :store_name, :balance, presence: true
    validates :balance, numericality: { greater_than_or_equal_to: 0 }
    # validates :atm_machine_name, :store_name, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
end