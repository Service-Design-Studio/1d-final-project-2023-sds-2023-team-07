# Create 2 users
user1 = User.create(
    name: "Kelvin",
    identification_number: "ABC123",
    account_balance: 2000.0,
    pin: "1234",
    face_image_url: "https://example.com/images/face1.jpg",
)

user2 = User.create(
    name: "Nathan",
    identification_number: "XYZ456",
    account_balance: 3000.0,
    pin: "3456",
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
    transaction_type = ['AWL', 'NCD'].sample
    amount = rand(1..100)

    # Adjust user account_balance and ATM balance
    if transaction_type == 'NCD'
        user.update(account_balance: user.account_balance + amount)
        atm.update(balance: atm.balance + amount)
    elsif transaction_type == 'AWL' && user.account_balance >= amount
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

# ub_1 = user1.account_balance
# ab_1 = atm1.balance

# ub_2 = user2.account_balance
# ab_2 = atm2.balance

# Create 80 transactions
# 80.times do |i|
#     if i < 20
#         # First 20 loops: Add $20 to user1
#         ub_1 = ub_1 + 20
#         user = user1
#         atm = [atm1, atm2].sample
#         transaction_type = 'NCD'
#         amount = 20
#         user_balance_left = ub_1
#         atm_balance_left = ab_1
#     elsif i < 40
#         # Next 20 loops: Withdraw $20 from user1
#         ub_1 = ub_1 - 20
#         user = user1
#         atm = [atm1, atm2].sample
#         transaction_type = 'AWL'
#         amount = 20
#         user_balance_left = ub_1
#         atm_balance_left = ab_1
#     elsif i < 60
#         # Next 20 loops: Add $20 to user2
#         ub_2 = ub_2 + 20
#         user = user2
#         atm = [atm1, atm2].sample
#         transaction_type = 'NCD'
#         amount = 20
#         user_balance_left = ub_2
#         atm_balance_left = ab_2
#     else
#         # Last 20 loops: Withdraw $20 from user2
#         ub_2 = ub_2 - 20
#         user = user2
#         atm = [atm1, atm2].sample
#         transaction_type = 'AWL'
#         amount = 20
#         user_balance_left = ub_2
#         atm_balance_left = ab_2
#     end

#     # Create transaction
#     Transaction.create(
#         user: user,
#         atm_machine: atm,
#         transaction_type: transaction_type,
#         amount: amount,
#         user_balance_left: user_balance_left,
#         atm_balance_left: atm_balance_left
#     )
# end
  