FactoryBot.define do
    factory :transaction_record, class: Transaction do
      amount { Faker::Number.decimal(l_digits: 2) }
      association :user
      association :atm_machines
      transaction_type { Transaction.transaction_types.keys.sample }
      created_at { DateTime.now }
      updated_at { DateTime.now }
    end
end
#need changes