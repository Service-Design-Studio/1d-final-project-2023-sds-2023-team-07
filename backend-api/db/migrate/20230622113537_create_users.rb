class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :identification_number
      t.decimal :balance
      t.string :pin
      t.string :face_image_url
      t.integer :is_active
      t.timestamps
    end
  end
end
