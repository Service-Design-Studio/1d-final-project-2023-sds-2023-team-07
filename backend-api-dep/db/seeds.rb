user1 = User.create(
    name: "John Doe",
    identification_number: "AB123456",
    account_balance: 1000.0,
    passbook_image_url: "https://example.com/passbook.jpg",
    atm_card_image_url: "https://example.com/atm_card.jpg",
    face_image_url: "https://example.com/face.jpg",
    fingerprint_data: "fingerprint_data_1",
    singpass_data: "singpass_data_1"
)

user2 = User.create(
    name: "Jane Smith",
    identification_number: "CD987654",
    account_balance: 1500.0,
    passbook_image_url: "https://example.com/passbook2.jpg",
    atm_card_image_url: "https://example.com/atm_card2.jpg",
    face_image_url: "https://example.com/face2.jpg",
    fingerprint_data: "fingerprint_data_2",
    singpass_data: "singpass_data_2"
)

# AtmMachines
atm1 = AtmMachine.create(
    atm_id: "ATM0001",
    store_name: "Bank HQ",
    address: "123 Bank St.",
    balance: 50000.0
)

atm2 = AtmMachine.create(
    atm_id: "ATM0002",
    store_name: "Bank Branch",
    address: "456 Bank St.",
    balance: 30000.0
)

# Transactions
Transaction.create(
    user_id: user1.id,
    atm_machine_id: atm1.id,
    transaction_type: 0,
    amount: 300.0
)

Transaction.create(
    user_id: user1.id,
    atm_machine_id: atm2.id,
    transaction_type: 1,
    amount: 100.0
)

Transaction.create(
user_id: user2.id,
atm_machine_id: atm1.id,
transaction_type: 0,
amount: 500.0
)

Transaction.create(
    user_id: user2.id,
    atm_machine_id: atm2.id,
    transaction_type: 1,
    amount: 200.0
)