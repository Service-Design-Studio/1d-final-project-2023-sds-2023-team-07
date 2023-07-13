import { Given, Step, Then, When } from "@badeball/cypress-cucumber-preprocessor";


// Background: Accessing camera app for facial recognition

Given("the user is at the transaction history page with the deposit and withdraw buttons", () => {
    cy.visit('/');
    cy.wait(500);
})

When("he clicks on the deposit or withdrawal button", () => {
    cy.contains('WITHDRAW').click();
})

Then("he is directed to authenticate", () => {
    cy.url().should('include', '/camera');
})

Then('he sees a loading screen while the software accesses the camera', () => {
    cy.contains('Loading');
})

Then("he is directed to the facial authentication page", () => {
    cy.get('video');
})


// Scenario: Using facial recognition
Given("the user is the correct owner of the account", () => {
    cy.intercept('POST', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/face', {
        body: {
            "authenticated": true
        }
    });
})

When("he looks at the camera and presses the authentication button", () => {
    cy.contains('AUTH NOW').click();
})

Then("the user will be redirected to the success page", () => {
    cy.contains('Success');
})


// Scenario: Using facial recognition but wrong user

Given("the user is not the account owner", () => {
    cy.intercept('POST', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/face', {
        body: {
            "authenticated": false
        }
    });
})

Then('the user will receive an "Authentication Failed, incorrect user" message', () => {
    cy.contains('Authentication failed, incorrect user').should('be.visible');
})


//Scenario: User cannot authenticate via face
When("face authentication fails thrice", () => {
    Step(this, 'the user is not the account owner');
    Step(this, 'he looks at the camera and presses the authentication button');
    Step(this, 'he looks at the camera and presses the authentication button');
    Step(this, 'he looks at the camera and presses the authentication button');
})

Then('he will be redirected to the pin authentication page', () => {
    cy.get('input').should('have.length', 4);
    cy.get('button')
})

// Scenario: User authenticates succesfully with his pin
Given('the user is at the pin authentication page', () => {
    Step(this, 'face authentication fails thrice');
    Step(this, 'he will be redirected to the pin authentication page');
})

When("he enters the correct pin number", () => {
    const pin = '1234';
    for (let i = 0; i < pin.length; i++) {
        const char = pin.charAt(i);
        cy.get('input').eq(i).type(char);
        cy.wait(100);
    }
    cy.intercept('POST', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/pin', {
        body: {
            "authenticated": true,
        }
    });
    cy.contains('AUTH NOW').click();
})

Then("he will be directed to a success page", () => {
    cy.contains('Success');
})

//Scenario: User cannot authenticate via face and wants forgets his login pin
When("he enters the wrong pin number", () => {
    const pin = '1234';
    for (let i = 0; i < pin.length; i++) {
        const char = pin.charAt(i);
        cy.get('input').eq(i).type(char);
        cy.wait(100);
    }
    cy.intercept('POST', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/pin', {
        body: {
            "authenticated": false,
        }
    });
    cy.contains('AUTH NOW').click();
})

Then("he will see a message that indicates his pin is wrong", () => {
    cy.contains('Incorrect Pin');
})

Then("he will not be directed to a success page", () => {
    cy.contains('Success').should('not.exist');
})
