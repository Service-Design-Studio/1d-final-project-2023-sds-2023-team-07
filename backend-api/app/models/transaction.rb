class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :atm_machine

  # Replace the integer types for transaction_type with string types
  # enum transaction_type: { deposit: 0, withdrawal: 1, other: 2 }
  validates :transaction_type, inclusion: { in: ['withdrawal', 'deposit'] }

  validates :amount, presence: true, numericality: { greater_than: 0 }
  # Other validations and methods
end