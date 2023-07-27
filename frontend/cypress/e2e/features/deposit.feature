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
