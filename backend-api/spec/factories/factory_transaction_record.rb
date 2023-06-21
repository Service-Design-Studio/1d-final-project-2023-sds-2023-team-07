FactoryBot.define do
  factory :transaction_record, class: Transaction do
    amount { Faker::Number.decimal(l_digits: 2) }
    association :user
    association :atm_machines
    transaction_type { Transaction.transaction_types.keys.sample }
    created_at { DateTime.now }
    updated_at { DateTime.now }
  end

  factory :user do
    name { Faker::Name.name }
    identification_number { Faker::IDNumber.unique.valid }
    account_balance { Faker::Number.decimal(l_digits: 2) }
    passbook_image_url { Faker::Internet.url }
    atm_card_image_url { Faker::Internet.url }
    face_image_url { Faker::Internet.url }
    fingerprint_data { Faker::Lorem.characters(number: 10) }
    singpass_data { Faker::Lorem.characters(number: 10) }
  end
end
#need changes