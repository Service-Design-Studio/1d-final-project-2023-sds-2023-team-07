class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :identification_number
      t.decimal :account_balance
      t.string :passbook_image_url
      t.string :atm_card_image_url
      t.string :face_image_url
      t.string :fingerprint_data
      t.string :singpass_data

      t.timestamps
    end
  end
end
