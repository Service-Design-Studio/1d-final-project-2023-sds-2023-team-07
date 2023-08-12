# Create 2 users
user1 = User.create(
    name: "Kelvin",
    identification_number: "ABC123",
    balance: 2000.0,
    pin: "1234",
    face_image_url: "https://example.com/images/face1.jpg",
    is_active: 0
)

user2 = User.create(
    name: "Nathan",
    identification_number: "XYZ456",
    balance: 3000.0,
    pin: "3456",
    face_image_url: "https://example.com/images/face2.jpg",
    is_active: 0
)

# Create 2 ATM machines
atm1 = AtmMachine.create(
    atm_machine_name: "ATM1",
    store_name: "Store A",
    balance: 10000.0
)

atm2 = AtmMachine.create(
    atm_machine_name: "ATM2",
    store_name: "Store B",
    balance: 15000.0
)  