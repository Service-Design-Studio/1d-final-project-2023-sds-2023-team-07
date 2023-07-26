# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_22_113545) do
  create_table "atm_machines", force: :cascade do |t|
    t.string "atm_machine_name"
    t.string "store_name"
    t.decimal "balance"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "atm_machine_id", null: false
    t.string "transaction_type"
    t.decimal "amount"
    t.decimal "user_balance_left"
    t.decimal "atm_balance_left"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["atm_machine_id"], name: "index_transactions_on_atm_machine_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "identification_number"
    t.decimal "balance"
    t.string "pin"
    t.string "face_image_url"
    t.integer "{
      "user": {
        "name": "John Doe",
        "identification_number": "1234567890",
        "balance": 5000.00,
        "pin": "1234",
        "face_image_url": "http://example.com/face.jpg",
        "is_active": 1
      }
    }
    "
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "transactions", "atm_machines"
  add_foreign_key "transactions", "users"
end
