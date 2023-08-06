class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :atm_machine

  validates :transaction_type, inclusion: { in: ['AWL', 'NCD'] }
  validates :amount, presence: true, numericality: { greater_than: 0 }

  after_create :update_balances

  private

  def update_balances
    if transaction_type == 'NCD'
      user.update!(balance: user.balance + BigDecimal(amount))
      atm_machine.update!(balance: atm_machine.balance + BigDecimal(amount))
    elsif transaction_type == 'AWL' && BigDecimal(amount) <= user.balance
      user.update!(balance: user.balance - BigDecimal(amount))
      atm_machine.update!(balance: atm_machine.balance - BigDecimal(amount))
    end
  end
end
