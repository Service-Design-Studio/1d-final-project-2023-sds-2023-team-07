Feature: Transaction History

    View transaction history on page open.

    Scenario: Launching the web app and viewing familiar transaction records
        Given I am logged into the application
        When the homepage is loaded
        Then I should see the homepage with the correct transaction records