#!/bin/bash

# Create the user
user_json=$(curl -s -X POST https://service-imba-ml42q3c3ya-as.a.run.app/users -d '{
  "name": "John Doe",
  "identification_number": "123456789",
  "account_balance": 5000,
  "passbook_image_url": "https://example.com/images/passbook1.jpg",
  "atm_card_image_url": "https://example.com/images/atm_card1.jpg",
  "face_image_url": "https://example.com/images/face1.jpg",
  "fingerprint_data": "fingerprint1",
  "singpass_data": "singpass1"
}' -H "Content-Type: application/json")

user_id=$(echo $user_json | jq '.id')

# Create ATM machines
atm1_json=$(curl -s -X POST https://service-imba-ml42q3c3ya-as.a.run.app/atm_machines -d '{
  "atm_machine_name": "ATM 1",
  "store_name": "Store A",
  "balance": 10000
}' -H "Content-Type: application/json")

atm2_json=$(curl -s -X POST https://service-imba-ml42q3c3ya-as.a.run.app/atm_machines -d '{
  "atm_machine_name": "ATM 2",
  "store_name": "Store B",
  "balance": 10000
}' -H "Content-Type: application/json")

atm1_id=$(echo $atm1_json | jq '.id')
atm2_id=$(echo $atm2_json | jq '.id')

# Create 50 transactions
for i in {1..50}
do
  transaction_type="deposit"
  if (( $i % 2 == 0 )); then
    transaction_type="withdrawal"
  fi

  atm_id=$atm1_id
  if (( $(( $i % 10 )) < 5 )); then
    atm_id=$atm2_id
  fi

  curl -s -X POST https://service-imba-ml42q3c3ya-as.a.run.app/transactions/$transaction_type -d "{
    \"user_id\": $user_id,
    \"atm_machine_id\": $atm_id,
    \"amount\": $(( ( RANDOM % 100 ) + 1 ))
  }" -H "Content-Type: application/json" > /dev/null

done