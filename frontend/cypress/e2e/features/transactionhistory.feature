Feature: Transaction History

    As a user that has been registered to the web app,
    I want to be able to view my transaction history when I visit the home page

    Background: Registered user
        Given I am a registered user with past transactions corresponding to "transactions.json"

    Scenario: Launching the web app and viewing familiar transaction records
        Given I visit the homepage
        Then I should see the homepage with my most recent transaction at the top

    Scenario: Reload the web page to retry getting transaction records
        Given I am unable to connect to the server
        And I visit the homepage
        Then I will see an empty screen
        And an error message
        And a suggestion to rectify the error
        And a button to refresh

    # Scenario: Viewing latest transactions on the home page
    #     Given I am on the homepage
    #     Then I should see the last 10 transactions containing 3 columns of datetime, amount and transaction type, balance

    Scenario: Viewing earlier transactions
        Given I visit the homepage
        When I scroll up the transaction panel
        Then I should see my earlier transactions

    # Scenario: Viewing expanded full transaction history by a change in screen orientation
    #     Given that I am on the homepage
    #     When I change my screen orientation to horizontal
    #     Then I should be able to see all the details of my latest couple of transaction records including the transaction code
