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
  end

  factory :user do
    name { Faker::Name.name }
    identification_number { Faker::IDNumber.unique.valid }
    account_balance { Faker::Number.decimal(l_digits: 2) }
    pin {9999}
    face_image_url { Faker::Internet.url }
    created_at {DateTime.now()}
    updated_at {DateTime.now()}
  end

  factory :atm_machine do
    atm_id { Faker::Number.number(digits: 10).to_s }
    store_name { Faker::Company.name }
    address { Faker::Address.full_address }
    balance { Faker::Number.decimal(l_digits: 2) }
    created_at { DateTime.now }
    updated_at { DateTime.now }
  end

  factory :post do
    title { Faker::Lorem.sentence }
    content { Faker::Lorem.paragraph }
    created_at { DateTime.now }
    updated_at { DateTime.now }
  end
end