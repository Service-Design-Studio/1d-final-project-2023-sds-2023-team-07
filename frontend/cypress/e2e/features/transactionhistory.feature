Feature: Transaction History

    As a user that has been registered to the web app,
    I want to be able to view my transaction history when I visit the home page

    Scenario: Launching the web app and viewing familiar transaction records
        Given I am logged into the application
        When the homepage is loaded
        Then I should see the homepage with the correct transaction records

    Scenario: Relaunching the app to reload transaction records
        Given I am logged into the application
        When the homepage is loaded
        Then I will see an empty screen
        And an error message to relaunch my application
        And a suggestion to rectify the error

    Scenario: Viewing latest transactions on the home page
        Given I am on the homepage
        Then I should see the last 10 transactions containing 3 columns of datetime, amount and transaction type, balance

    Scenario: Viewing earlier transactions
        Given I am on the homepage
        When I scroll up the transaction panel
        Then I should see my earlier transactions apart from the latest transactions mentioned above

    Scenario: Viewing expanded full transaction history by a change in screen orientation
        Given that I am on the homepage
        When I change my screen orientation to horizontal
        Then I should be able to see all the details of my latest couple of transaction records including the transaction code
