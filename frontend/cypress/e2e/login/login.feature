Feature: Login

    Scenario: Successful login
        Given I am a registered user of the app
        And I open the login page
        When I enter my NRIC
        And I enter my PIN
        Then I should see be directed to the transactions history page

    Scenario: Incorrect NRIC
        When I open the login page
        And enter the NRIC of a user that does not exist
        Then I should see a message telling me that the user does not exist
        And a link directing me to sign up

    Scenario: Fail authentication
        Given I am a registered user of the app
        And I open the login page
        And I enter my NRIC
        And I enter the wrong PIN
        Then I should see a message telling me that the PIN is incorrect