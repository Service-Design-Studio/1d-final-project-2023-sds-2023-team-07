Feature: Transaction authentication 2FA

    Background: On facial recognition page
        Given the user is at the transaction history page with the deposit and withdraw buttons
        When he clicks on the deposit or withdrawal button
        Then he is directed to authenticate 
        And he sees a loading screen while the software accesses the camera
        Then he is directed to the facial authentication page

    Scenario: Using facial recognition
        Given the user is the correct owner of the account
        When he looks at the camera and presses the authentication button
        Then the user will be redirected to the success page

    Scenario: Using facial recognition but wrong user
        Given the user is not the account owner
        When he looks at the camera and presses the authentication button
        Then the user will receive an "Authentication Failed, incorrect user" message

    Scenario: User cannot authenticate via face
        When face authentication fails thrice
        Then he will be redirected to the pin authentication page

    Scenario: User authenticates succesfully with his pin
        Given the user is at the pin authentication page
        When he enters the correct pin number
        Then he will be directed to a success page

    Scenario: User authenticates unsuccesfully with his pin
        Given the user is at the pin authentication page
        When he enters the wrong pin number
        Then he will see a message that indicates his pin is wrong
