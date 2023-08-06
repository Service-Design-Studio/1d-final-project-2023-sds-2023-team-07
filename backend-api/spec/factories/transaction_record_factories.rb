require "faker"
require "factory_bot_rails"

FactoryBot.define do
  factory :transaction_record, class: Transaction do
    amount { Faker::Number.decimal(l_digits: 2) }
    association :user, factory: :user
    association :atm_machine, factory: :atm_machine
    transaction_type { Transaction.transaction_types.keys.sample }
    created_at { DateTime.now }
    updated_at { DateTime.now }
    user_balance_left {Faker::Number.decimal(l_digits:2)}
    atm_balance_left {Faker::Number.decimal(l_digits:2)}
  end

  factory :user do
    name { Faker::Name.name }
    identification_number { Faker::IDNumber.unique.valid }
    balance { Faker::Number.decimal(l_digits: 2) }
    pin {"1234"} # string
    face_image_url { Faker::Internet.url } # string
    is_active {0}# int
    created_at { DateTime.now }
    updated_at { DateTime.now }
  end

  factory :atm_machine do
    atm_machine_name {Faker::Company.name}
    store_name { Faker::Company.name }
    balance { Faker::Number.decimal(l_digits: 2) }
    created_at { DateTime.now }
    updated_at { DateTime.now }
  end

end