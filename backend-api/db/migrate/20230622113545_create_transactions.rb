class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :atm_machine, null: false, foreign_key: true
      t.string :transaction_type
      t.decimal :amount
      t.decimal :user_balance_left

      t.timestamps
    end
  end
end
