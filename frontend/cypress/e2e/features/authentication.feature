Feature: Transaction authentication 2FA

    Scenario: Accessing camera app for facial recognition
        Given the user is at the transaction history page with the deposit and withdraw buttons
        And he has camera permissions set to allowed
        When he clicks on the deposit or withdrawal button
        Then he is directed to a loading screen while the software accesses the camera
        When the camera feature has been fully loaded
        Then he is directed to the facial authentication page.

    Scenario: Using facial recognition
        Given the user is on the facial authentication page
        And he is the correct owner of the account
        When he looks at the camera and presses the authentication button
        Then the user will be redirected to the success page

    Scenario: Using facial recognition but wrong user
        Given the user is on the facial authentication page
        When he looks at the camera and presses the authentication button
        Then the user will receive an "Authentication Failed, incorrect user" message.

    Scenario: User cannot authenticate via face
        Given the user is at the face authentication page
        When he fails the authentication thrice
        Then he will be redirected to the pin authentication page
        And has number boxes to fill in his pin

    Scenario: User authenticates succesfully with his pin
        Given the user is at the pin authentication page
        When he fails he enteres the correct pin number
        Then he will be directed to a success page

    Scenario: User authenticates unsuccesfully with his pin
        Given the user is at the pin authentication page
        When he fails he enteres the wrong pin number
        Then he will be see a message that indicates his pin is wrong
