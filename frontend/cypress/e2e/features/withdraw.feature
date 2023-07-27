Feature: Withdraw

    As an elderly user who is in need of cash,
    I want to use the app to easily withdraw cash from the ATM 
    and see the new transaction reflected on my home page

Background: Selected withdraw on the home page
    Given I am on the home page
    When I click the "Withdraw" button
    And successfully authenticate
    Then I should see a page asking for the amount I want to withdraw

Scenario: Successful withdrawal
    Given I am on the withdraw amount selection page
    When I click on the $100 button
    And I see a page asking to confirm that I want to deposit $100
    And I click on the "Yes" button
    And I see a QR code to scan
    And I succesfully complete the withdrawal on the ATM
    Then I should see a success page

Scenario: Unsuccessful withdrawal
    Given I am on the withdraw amount selection page
    When I click on the $100 button
    And I see a page asking to confirm that I want to deposit $100
    And I click on the "Yes" button
    And I see a QR code to scan
    And I fail to complete the transaction on the ATM
    Then I should see a failure page

Scenario: Return to homepage
    Given I am on the withdraw amount selection page
    When I click on the return to homepage button
    Then I should be directed back to the home page




# Withdraw

# Happy path
# Scenario: Clicking Withdraw at Home Page
# Given that I am at Home Page
# When I click on the "Withdraw" button
# Then I should be directed to the Withdrawal page

# Sad path
# Scenario: Can't connect to server
# Given that I am at Home Page
# When I click on the "Withdraw" button
# And the server is down
# Then I should see an error pop-up that states "Try Again"

# Happy path
# Scenario: Clicking Any Amount at Withdrawal Page
# Given that I am at Withdrawal Page
# When I click on a box containing a number
# Then I should be directed to the Confirm to Withdraw page
# And I should see that number as well

# Scenario: "No" to Confirm to Withdraw
# Given I am on the Confirm to Withdraw Page
# When I click on the "No" button
# Then I should be directed to the Withdrawal Page

# Scenario: "Yes" to Confirm to Withdraw
# Given I am on the Confirm to Withdraw Page
# When I click on the "Yes" button
# Then I should be directed to the Authentication Page

# Scenario: Authentication Page
# Given that I am on the Authentication Page
# When I click on the "Auth Now" button
# And I am the right user
# Then I should be directed to the QR Connection Page
# And I should see a QR code

# Happy path
# Scenario: Scan successful
# Given that I am on the QR Connection Page
# When I use the QR reader to scan my QR code
# Then I should be directed to the Loading Page
# And I should see "Scan Success"

# Sad path
# Scenario: Scan unsuccessful
# Given that I am on the QR Connection Page
# And the QR code is invalid
# When I use the QR reader to scan my QR code
# Then I should see an error pop-up that states "Try Again"

# Happy path
# Scenario: Loading to Success Page
# Given that I am at the Loading Page
# When my account has been updated
# Then I should be directed to the Success Page
# And I should see "Transaction Success"
# And I should see my new account balance

# Scenario: Success to Home Page
# Given that I am at the Success Page
# When I click on the "Return to Home Page" button
# Then I should be directed to the Home Page
# And I should see an updated table
