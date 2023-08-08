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
