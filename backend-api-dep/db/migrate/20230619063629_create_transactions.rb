class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :atm_machine, null: false, foreign_key: true
      t.integer :transaction_type
      t.decimal :amount

      t.timestamps
    end
  end
end
