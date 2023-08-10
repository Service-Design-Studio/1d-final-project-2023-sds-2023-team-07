Feature: Sign up

    Scenario: Successful sign up
        Given I am a new valid user to the app
        And I open the login page
        And I press the sign up button
        When I enter my details
        And set a PIN
        And register my face
        Then I should be registered as a user
        And I should be directed to the transactions history page
        And I should see no previous transactions

    Scenario: Invalid NRIC
        Given I am a new user to the app
        And I open the login page
        And I press the sign up button
        When I enter text that is not an NRIC
        Then I should see a message telling me that I entered an invalid NRIC
        And I should not be able to move on to the next page
