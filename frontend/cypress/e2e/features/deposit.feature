Feature: Deposit

    As an elderly user who has excess cash,
    I want to use the app to easily deposit cash into the ATM 
    and see the new transaction reflected on my home page

Background: Selected deposit on the home page
    Given I am on the home page
    When I click the "Deposit" button
    And successfully authenticate
    Then I should see a page asking to confirm that I want to deposit

Scenario: Successful deposit
    Given I am on the confirm to deposit page
    When I click on the "Yes" button
    And I see a QR code to scan
    And I succesfully complete the deposit on the ATM
    Then I should see a success page

Scenario: Unsuccessful deposit
    Given I am on the confirm to deposit page
    When I click on the "Yes" button
    And I see a QR code to scan
    And I fail to complete the deposit on the ATM
    Then I should see a failure page

Scenario: "No" to confirm to deposit
    Given I am on the confirm to deposit page
    When I click on the "No" button
    Then I should be directed back to the home page


# Feature 3 (Deposit)

# Background: I am an authenticated user trying to deposit $300

# Scenario: Execute Deposit
# Given that I am on the Deposit Balance Page
# When I deposit that cash
# Then I should be on the "Confirm Deposit Page" and see a confirmation for the correct amount of cash that I put into the ATM and a Button that says "Confirm"

# Scenario: Ability to recount deposit amount
# Given that the amount displayed is wrong
# When I press "Recount Amount"
# Then I should be redirected to a "Recounting Notification" page that states "Recounting."

# Scenario: Complete transaction
# Given that I have physically deposited cash and I am on the "Confirm Transaction Page"
# When I click the "Confirm" Button
# Then I should see a confirmation on my app that show me the "Transaction Completed Page" with my updated balance and the transaction details.

# Scenario: Updating of transaction records in transaction table
# Given that I do not see the "Transaction Completed Page"
# When I navigate back onto the home screen with the check balance page
# Then I should be see the latest transaction updated as the transaction went through

# Scenario: Cash withdrawal standard
# Given that I am on the "Cash Withdrawal" page and I have sufficient balance
# When I key in the amount of cash I want to withdraw
# Then I should see "Withdraw Cash Confirm" page which contains the correct amount of cash I want to withdraw, a "Cancel Transaction" button, "Edit Transaction" button and "Confirm Transaction" button

# Scenario: Cash withdrawal wrong amount
# Given that I type in the wrong amount for withdrawal
# When I click on the "Edit Transaction" button
# Then I should be redirected back to the "Cash Withdrawal" page.

# Scenario: Insufficient Balance
# Given that I do not have sufficient balance to withdraw
# When I click the "Confirm" Button
# Then I should see a notification that states, "You have {} balance in your bank only, cannot withdraw {} amount" and will be redirected to the "Cash Withdrawal" Page.

# Scenario: QR code for transactions
# Given that I am at an ATM machine and that I am on the "Cash Withdrawal" page
# When I click "Confirm Transaction"
# Then I should be redirected to the "Scan To Transact" page and see a QR code scanner interface that allows me to scan the QR code on the ATM and a "Cancel" button

# Scenario: QR code authentication for ATM
# Given that the QR code scanner does not activate on the "Scan to Transact" Page
# When 200ms passes
# Then I should see an error message pop up and be redirected back to the "Cash Withdrawal" page with my last input values saved.

# Scenario: QR code cannot connect to atm
# Given that I scanned the ATM machine's QR
# When 200 ms passes
# Then I should see an error notification that connection is not established, and I should be notified to scan again.

# Scenario: Transaction confirmation
# Given that I am on the "Transaction Execution" page
# When I click on the" Execute Transaction" button
# Then I should be redirected to a "Transaction Completed" page with my transaction details and the ATM will dispense the correct sum.

# Scenario: Updating of transaction records for withdrawal
# Given that the "Transaction Completed Page" does not pop up after my cash is withdrawal
# When I click onto the home page
# Then I should see my updated transaction records in the check balance portion of the page

