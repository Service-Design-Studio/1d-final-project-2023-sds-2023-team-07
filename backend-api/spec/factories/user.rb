FactoryBot.define do
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

