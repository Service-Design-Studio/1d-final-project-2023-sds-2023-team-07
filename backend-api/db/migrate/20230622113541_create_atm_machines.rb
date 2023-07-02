class CreateAtmMachines < ActiveRecord::Migration[7.0]
  def change
    create_table :atm_machines do |t|
      t.string :atm_machine_name
      t.string :store_name
      t.decimal :balance

      t.timestamps
    end
  end
end
