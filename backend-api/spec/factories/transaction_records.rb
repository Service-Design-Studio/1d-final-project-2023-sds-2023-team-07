FactoryBot.define do
    factory :transaction do
      description { Faker::Lorem.sentence }
      amount { Faker::Number.decimal(l_digits: 2) }
      association :user
      association :atm_machine
      transaction_type { rand(0..2) }
      created_at { DateTime.now }
      updated_at { DateTime.now }
    end
  end
  
#need changes