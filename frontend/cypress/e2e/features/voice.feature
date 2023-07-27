# # Activating Voice Command

# Scenario: Activate Voice Command
# Given that I am at Home Page
# When I click on the "Activate Speech-to-Text" button
# I should be directed to the Speech-to-Text Page

# Scenario: "Cancel" on Speech-to-Text Page
# Given that I am at the Speech-to-Text Page
# When I click on the "Cancel" button
# Then I should be directed to the Home Page

# # Sad path
# Scenario: "Record" on Speech-to-Text Page
# Given that I am at the Speech-to-Text Page
# When I click on the "Record" button
# And I say "I want to deposit"
# Then I should be directed to the Confirm to Deposit Page

# # Voice Command to Deposit

# Scenario: "Record" on Speech-to-Text Page
# Given that I am at the Speech-to-Text Page
# When I click on the "Record" button
# And I say "I want to deposit"
# Then I should be directed to the Confirm to Deposit Page

# Scenario: "No" to Confirm to Deposit
# Given I am on the Confirm to Deposit Page
# When I say "No"
# Then I should be directed to the Home Page

# Scenario: "Yes" to Confirm to Deposit
# Given I am on the Confirm to Deposit Page
# When I say "Yes"
# Then I should be directed to the Authentication Page

# Scenario: Authentication Page
# Given that I am on the Authentication Page
# When I say "Auth Now"
# And I am the right user
# Then I should be directed to the QR Connection Page
# And I should see a QR code

# # Happy path
# Scenario: Scan successful
# Given that I am on the QR Connection Page
# When I use the QR reader to scan my QR code
# Then I should be directed to the Loading Page
# And I should see "Scan Success"

# # Sad path
# Scenario: Scan unsuccessful
# Given that I am on the QR Connection Page
# And the QR code is invalid
# When I use the QR reader to scan my QR code
# Then I should see an error pop-up that states "Try Again"

# # Happy path
# Scenario: Loading to Success Page
# Given that I am at the Loading Page
# When my account has been updated
# Then I should be directed to the Success Page
# And I should see "Transaction Success"
# And I should see my new account balance

# Scenario: Success to Home Page
# Given that I am at the Success Page
# When I say "Return to Home Page"
# Then I should be directed to the Home Page
# And I should see an updated table

# # Voice Command to Withdraw

# Scenario: "Record" on Speech-to-Text Page
# Given that I am at the Speech-to-Text Page
# When I click on the "Record" button
# And I say "I want to withdraw"
# Then I should be directed to the Withdrawal Page

# # Happy path
# Scenario: Clicking Any Amount at Withdrawal Page
# Given that I am at Withdrawal Page
# When I say a number
# Then I should be directed to the Confirm to Withdraw page
# And I should see that number as well

# Scenario: "No" to Confirm to Withdraw
# Given I am on the Confirm to Withdraw Page
# When I say "No"
# Then I should be directed to the Withdrawal Page

# Scenario: "Yes" to Confirm to Withdraw
# Given I am on the Confirm to Withdraw Page
# When I say "Yes"
# Then I should be directed to the Authentication Page

# Scenario: Authentication Page
# Given that I am on the Authentication Page
# When I say "Auth Now"
# And I am the right user
# Then I should be directed to the QR Connection Page
# And I should see a QR code

# # Happy path
# Scenario: Scan successful
# Given that I am on the QR Connection Page
# When I use the QR reader to scan my QR code
# Then I should be directed to the Loading Page
# And I should see "Scan Success"

# # Sad path
# Scenario: Scan unsuccessful
# Given that I am on the QR Connection Page
# And the QR code is invalid
# When I use the QR reader to scan my QR code
# Then I should see an error pop-up that states "Try Again"

# # Happy path
# Scenario: Loading to Success Page
# Given that I am at the Loading Page
# When my account has been updated
# Then I should be directed to the Success Page
# And I should see "Transaction Success"
# And I should see my new account balance

# Scenario: Success to Home Page
# Given that I am at the Success Page
# When I say "Return to Home Page"
# Then I should be directed to the Home Page
# And I should see an updated table






# Feature: Voice

#     Feature Descriptione

# Scenario: Activate voice command

# Given that I pressed the voice command button
# When the voice command page pops up
# Then I will see a press to record button


# Scenario: Voice command for withdrawal

# Given that I press and hold the record button
# When the screen prompt says "start speaking"
# And I say "Withdraw 50 dollars please"
# Then I will be redirected to the transaction confirmation page that shows withdraw $50

# Scenario: Voice command for withdrawal but insufficient balance

# Given that I press and hold the record button
# When the screen prompt says "start speaking"
# And I say "Withdraw 5000000 dollars please"
# Then I will be notified that I have insufficient balance and my current balance will be shown in the notification

# Scenario: Voice command for withdrawal

# Given that I press and hold the record button
# When the screen prompt says "start speaking"
# And I say "I want to put in money"
# Then I will be redirected to the transaction confirmation page that shows deposit.

# Scenario: Inability to detect transaction type

# Given that I press and hold the record button
# When the screen prompt says "start speaking"
# And I say "oh my god the weather is really hot today"
# Then I will be notified that transaction is not recognized, try again
