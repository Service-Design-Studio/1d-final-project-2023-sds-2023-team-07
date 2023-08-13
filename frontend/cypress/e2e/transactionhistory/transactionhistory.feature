Feature: Transaction History

    As an elderly user that has been registered to the web app,
    I want to be able to view my transaction history when I visit the home page

    Background: Registered user
        Given I am a registered user

    Scenario: Launching the web app and viewing familiar transaction records
        Given I have past transactions
        And I visit the homepage
        Then I should see the homepage with my most recent transaction at the top

    Scenario: Reload the web page to retry getting transaction records
        Given I am unable to connect to the server
        And I visit the homepage
        Then I will see an empty screen
        And an error message
        And a suggestion to rectify the error
        And a button to refresh

    Scenario: Viewing earlier transactions
        Given I have past transactions
        And I visit the homepage
        When I scroll up the transaction panel
        Then I should see my earlier transactions

