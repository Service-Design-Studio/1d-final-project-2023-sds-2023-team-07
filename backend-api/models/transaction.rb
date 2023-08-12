class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :atm_machine

  validates :transaction_type, inclusion: { in: ['AWL', 'NCD'] }
  validates :amount, presence: true, numericality: { greater_than: 0 }
  
  # Custom validation
  validate :validate_user_id
  validate :validate_atm_machine_id
  validate :sufficient_balance, if: -> { transaction_type == 'AWL' }

  after_create :update_balances
  around_create :lock_user_and_validate_status


  def self.create_for_user!(params, user)
    transaction = new(params)
  
    # Validate user based on user_id
    if !user || !User.exists?(user.id) || user.id <= 0
      transaction.errors.add(:user, "Invalid user")
      raise ActiveRecord::RecordInvalid, transaction
    end
  
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
  

  def lock_user_and_check_status
    # THIS METHOD WILL BLOCK OTHER TRANSACTION ENTITIES FROM MAKING UPDATES TO A USER (PREVENTING RACE CONDITION)
    # TRANSACTION ENTITIES WILL UPDATE THE USER ONE BY ONE

    # Lock the user record from the database, only allows the user to be updated by the transaction entity calling the lock.
    # So on transaction creation, it will instantiate a new Transaction object, then after it finishes, our frontend (ATM simulator) will patch user.is_active to 1
    # Then our frontend main (Mobile) will patch patch user.is_active to 0, allowing other transactions to be created.
    user.lock!
  
    # Check the user's status
    if user.is_active != 0
      errors.add(:base, "User is currently in another transaction or the last transaction failed.")
      raise ActiveRecord::Rollback, "User is currently in another transaction or the last transaction failed."
    end
  
    yield # this will execute the creation of the transaction
  end
  

  def sufficient_balance
    errors.add(:amount, "Insufficient balance") if BigDecimal(amount) > user.balance && BigDecimal(amount) > atm_machine.balance
  end

  def validate_user_id
    if !user_id.is_a?(Integer) || user_id < 0 || user_id > User.maximum(:id)
      errors.add(:user, "Invalid user ID")
    end
  end

  def validate_atm_machine_id
    if !atm_machine_id.is_a?(Integer) || atm_machine_id < 0 || atm_machine_id > AtmMachine.maximum(:id)
      errors.add(:atm_machine_id, "Invalid ATM machine ID")
    end
  end

end
