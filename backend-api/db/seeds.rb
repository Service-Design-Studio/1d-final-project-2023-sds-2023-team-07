# Create 2 users
user1 = User.create(
    name: "Kelvin",
    identification_number: "ABC123",
    account_balance: 2000.0,
    pin: "123456",
    face_image_url: "https://example.com/images/face1.jpg",
)

user2 = User.create(
    name: "Nathan",
    identification_number: "XYZ456",
    account_balance: 3000.0,
    pin: "345676",
    face_image_url: "https://example.com/images/face2.jpg",
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

# Create 50 transactions
50.times do |i|
    user = [user1, user2].sample
    atm = [atm1, atm2].sample
    transaction_type = ['withdrawal', 'deposit'].sample
    amount = rand(1..100)

    # Adjust user account_balance and ATM balance
    if transaction_type == 'deposit'
        user.update(account_balance: user.account_balance + amount)
        atm.update(balance: atm.balance + amount)
    elsif transaction_type == 'withdrawal' && user.account_balance >= amount
        user.update(account_balance: user.account_balance - amount)
        atm.update(balance: atm.balance - amount)
    end

    # Create transaction
    Transaction.create(
        user: user,
        atm_machine: atm,
        transaction_type: transaction_type,
        amount: amount,
        user_balance_left: user.account_balance,
        atm_balance_left: atm.balance
    )
end