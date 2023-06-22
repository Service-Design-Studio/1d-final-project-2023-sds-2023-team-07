#!/bin/bash

API_URL="https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app"

for ((i = 1; i <= 50; i++))
do
  # Randomly generate deposit or withdrawal transactions
  transaction_type=$((RANDOM % 2))
  endpoint="deposit"
  if [ $transaction_type -eq 1 ]
  then
    endpoint="withdraw"
  fi

  # Randomly generate user_id and atm_machine_id (in this example, between 1 and 10)
  user_id=1
  atm_machine_id=1

  # Randomly generate an amount for the transaction (in this example, between 1 and 1000)
  amount=$((RANDOM % 1000 + 1))

  curl -X POST \
    -H "Content-Type: application/json" \
    -d "{\"transaction\": {\"user_id\": $user_id, \"atm_machine_id\": $atm_machine_id, \"amount\": $amount}}" \
    $API_URL/$endpoint
  echo -e "\nTransaction $i submitted"
done