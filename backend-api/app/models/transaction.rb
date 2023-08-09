class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :atm_machine

  validates :transaction_type, inclusion: { in: ['AWL', 'NCD'] }
  validates :amount, presence: true, numericality: { greater_than: 0 }
  
  # Custom validation
  validate :sufficient_balance, if: -> { transaction_type == 'AWL' }

  after_create :update_balances

  def self.create_for_user!(params, user)
    transaction = new(params)
    transaction.user = user
    
    # Check for ATM machine existence
    unless AtmMachine.exists?(params[:atm_machine_id])
      transaction.errors.add(:atm_machine_id, "ATM Machine not found")
      raise ActiveRecord::RecordInvalid, transaction
    end
  
    transaction.save!
    transaction
  end
  def update_balances
      if transaction_type == 'NCD'
          user.increment!(:balance, BigDecimal(amount))
          atm_machine.increment!(:balance, BigDecimal(amount))
      else
          user.decrement!(:balance, BigDecimal(amount))
          atm_machine.decrement!(:balance, BigDecimal(amount))
        end
      
  
      # Updating the balance left fields for the transaction
      self.user_balance_left = user.balance
      self.atm_balance_left = atm_machine.balance
      self.save!
    
  end
  

  private

  def sufficient_balance
    errors.add(:amount, "Insufficient balance") if BigDecimal(amount) > user.balance && BigDecimal(amount) > atm_machine.balance
  end

  
end
