Feature: Transaction authentication 2FA

    Scenario: Accessing camera app for facial recognition
        Given the user is at the transaction history page with the deposit and withdraw buttons
        And he has camera permissions set to allowed
        When he clicks on the deposit or withdrawal button
        Then he is directed to the facial authentication page.

    Scenario: Accessing camera app for facial recognition but unintended
        Given the user is at the transaction history page with the deposit and withdraw buttons
        And he has camera permissions set to allowed
        When he clicks on the deposit or withdrawal button
        Then he is directed to the facial authentication page
        And there is a button to navigate back to the main page

    Scenario: Using facial recognition
        Given the user is on the facial authentication page
        When he looks at the camera and 3 seconds has passed
        Then the user will be redirected to the transaction amount page

    Scenario: Using facial recognition but wrong user
        Given the user is on the facial authentication page
        When he looks at the camera and 3 seconds has passed
        Then the user will receive an "Authentication Failed, incorrect user" message.

    Scenario: User cannot authenticate via face and wants to fallback to pin login instead
        Given the user is at the facial authentication page
        When he fails the authentication thrice
        Then he will be redirected to the pin authentication page
        And has number boxes to fill in his pin

    Scenario: User cannot authenticate via face and wants forgets his login pin
        Given the user is at the facial authentication page
        When he fails the authentication thrice
        And he fails the pin authentication page
        Then he will be notified of his failure
        And to try again in 1 minute
