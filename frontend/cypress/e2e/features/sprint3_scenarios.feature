# Feature: Deposit, Withdraw and Voice Command

#     # Happy path
#     Scenario: Clicking Deposit at Home Page
#         Given that I am at Home Page
#         When I click on the "Deposit" button
#         Then I should be directed to the Authentication Page

#     # Sad path
#     Scenario: Can't connect to server
#         Given that I am at Home Page
#         When I click on the "Deposit" button
#         And the server is down
#         Then I should see an error pop-up that states "Try Again"

#     Scenario: Authentication Page
#         Given that I am on the Authentication Page
#         When I click on the "Auth Now" button
#         And I am the right user
#         Then I should be directed to the Confirm to Deposit Page

#     Scenario: "No" to Confirm to Deposit
#         Given I am on the Confirm to Deposit Page
#         When I click on the "No" button
#         Then I should be directed to the Home Page

#     Scenario: "Yes" to Confirm to Deposit
#         Given I am on the Confirm to Deposit Page
#         When I click on the "Yes" button
#         Then I should be directed to the QR Connection Page
#         And I should see a QR code

#     # Happy path
#     Scenario: Scan successful
#         Given that I am on the QR Connection Page
#         When I use the QR reader to scan my QR code
#         Then I should be directed to the Look At ATM Page

#     # Sad path
#     Scenario: Scan unsuccessful
#         Given that I am on the QR Connection Page
#         And the QR code is invalid
#         When I use the QR reader to scan my QR code
#         Then I should see an error pop-up that states "Try Again"

#     Scenario: Loading to Success Page
#         Given that I am at the Look At ATM Page
#         When my account has been updated
#         Then I should be directed to the Success Page
#         And I should see "Transaction Success"
#         And I should see my new account balance

#     Scenario: Success to Home Page
#         Given that I am at the Success Page
#         When I click on the "Return to Home Page" button
#         Then I should be directed to the Home Page
#         And I should see an updated table

# # Withdraw

#     # Happy path
#     Scenario: Clicking Withdraw at Home Page
#         Given that I am at Home Page
#         When I click on the "Withdraw" button
#         Then I should be directed to the Authentication Page

#     # Sad path
#     Scenario: Can't connect to server
#         Given that I am at Home Page
#         When I click on the "Withdraw" button
#         And the server is down
#         Then I should see an error pop-up that states "Try Again"

#     Scenario: Authentication Page
#         Given that I am on the Authentication Page
#         When I click on the "Auth Now" button
#         And I am the right user
#         Then I should be directed to the Withdrawal Page

#     Scenario: Clicking Any Amount at Withdrawal Page
#         Given that I am at Withdrawal Page
#         When I click on a box containing a number
#         Then I should be directed to the Confirm to Withdraw page
#         And I should see that number as well

#     Scenario: "No" to Confirm to Withdraw
#         Given I am on the Confirm to Withdraw Page
#         When I click on the "No" button
#         Then I should be directed to the Withdrawal Page

#     Scenario: "Yes" to Confirm to Withdraw
#         Given I am on the Confirm to Withdraw Page
#         When I click on the "Yes" button
#         Then I should be directed to the QR Connection Page
#         And I should see a QR code

#     # Happy path
#     Scenario: Scan successful
#         Given that I am on the QR Connection Page
#         When I use the QR reader to scan my QR code
#         Then I should be directed to the Look At ATM Page

#     # Sad path
#     Scenario: Scan unsuccessful
#         Given that I am on the QR Connection Page
#         And the QR code is invalid
#         When I use the QR reader to scan my QR code
#         Then I should see an error pop-up that states "Try Again"

#     Scenario: Loading to Success Page
#         Given that I am at the Look At ATM Page
#         When my account has been updated
#         Then I should be directed to the Success Page
#         And I should see "Transaction Success"
#         And I should see my new account balance

#     Scenario: Success to Home Page
#         Given that I am at the Success Page
#         When I click on the "Return to Home Page" button
#         Then I should be directed to the Home Page
#         And I should see an updated table

# # Activating Voice Command

#     Scenario: Activate Voice Command
#         Given that I am at Home Page
#         When I click on the "Activate Speech-to-Text" button
#         Then I should be directed to the Speech-to-Text Page

#     Scenario: "Cancel" on Speech-to-Text Page
#         Given that I am at the Speech-to-Text Page
#         When I click on the "Cancel" button
#         Then I should be directed to the Home Page

# # Voice Command to Deposit
#     Scenario: "Record" on Speech-to-Text Page
#         Given that I am at the Speech-to-Text Page
#         When I click on the "Start Recording" button
#         And I say "I want to deposit"
#         And I click on the "Stop Recording" button
#         Then I should be directed to the Confirm to Deposit Page

#     Scenario: "No" to Confirm to Deposit
#         Given I am on the Confirm to Deposit Page
#         When I say "No"
#         Then I should be directed to the Home Page

#     Scenario: "Yes" to Confirm to Deposit
#         Given I am on the Confirm to Deposit Page
#         When I say "Yes"
#         Then I should be directed to the Authentication Page

#     Scenario: Authentication Page
#         Given that I am on the Authentication Page
#         When I say "Auth Now"
#         And I am the right user
#         Then I should be directed to the QR Connection Page
#         And I should see a QR code

#     # Happy path
#     Scenario: Scan successful
#         Given that I am on the QR Connection Page
#         When I use the QR reader to scan my QR code
#         Then I should be directed to the Loading Page
#         And I should see "Scan Success"

#     # Sad path
#     Scenario: Scan unsuccessful
#         Given that I am on the QR Connection Page
#         And the QR code is invalid
#         When I use the QR reader to scan my QR code
#         Then I should see an error pop-up that states "Try Again"

#     # Happy path
#     Scenario: Loading to Success Page
#         Given that I am at the Loading Page
#         When my account has been updated
#         Then I should be directed to the Success Page
#         And I should see "Transaction Success"
#         And I should see my new account balance

#     Scenario: Success to Home Page
#         Given that I am at the Success Page
#         When I say "Return to Home Page"
#         Then I should be directed to the Home Page
#         And I should see an updated table

# # Voice Command to Withdraw

#     Scenario: "Record" on Speech-to-Text Page
#         Given that I am at the Speech-to-Text Page
#         When I click on the "Start Recording" button
#         And I say "I want to withdraw $50"
#         And I click on the "Stop Recording" button
#         Then I should be directed to the Confirm to Withdraw Page
#         And I should see $50 as well

#     Scenario: "No" to Confirm to Withdraw
#         Given I am on the Confirm to Withdraw Page
#         When I say "No"
#         Then I should be directed to the Home Page

#     Scenario: "Yes" to Confirm to Withdraw
#         Given I am on the Confirm to Withdraw Page
#         When I say "Yes"
#         Then I should be directed to the Home Page

#     Scenario: Authentication Page
#         Given that I am on the Authentication Page
#         When I say "Auth Now"
#         And I am the right user
#         Then I should be directed to the QR Connection Page
#         And I should see a QR code

#     # Happy path
#     Scenario: Scan successful
#         Given that I am on the QR Connection Page
#         When I use the QR reader to scan my QR code
#         Then I should be directed to the Loading Page
#         And I should see "Scan Success"

#     # Sad path
#     Scenario: Scan unsuccessful
#         Given that I am on the QR Connection Page
#         And the QR code is invalid
#         When I use the QR reader to scan my QR code
#         Then I should see an error pop-up that states "Try Again"

#     Scenario: Loading to Success Page
#         Given that I am at the Loading Page
#         When my account has been updated
#         Then I should be directed to the Success Page
#         And I should see "Transaction Success"
#         And I should see my new account balance

#     Scenario: Success to Home Page
#         Given that I am at the Success Page
#         When I say "Return to Home Page"
#         Then I should be directed to the Home Page
#         And I should see an updated table



