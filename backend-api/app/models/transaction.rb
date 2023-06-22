class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :atm_machine
  enum transaction_types: {
    deposit: 0,
    withdrawal: 1,
    transfer: 2
  }
  validates :amount, presence: true, numericality: { greater_than: 0 }
end
