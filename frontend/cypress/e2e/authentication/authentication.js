import { Given, Step, Then, When } from "@badeball/cypress-cucumber-preprocessor";


// Background: Accessing camera app for facial recognition

Given("the user is at the transaction history page with the deposit and withdraw buttons", () => {
    cy.intercept('GET', Cypress.env('transactions_uri')).as('getTransactions');
    cy.visit('/');
    cy.wait('@getTransactions');
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
    cy.get('video', {timeout: 10000});
    cy.wait(1000);
})


// Scenario: Using facial recognition
Given("the user is the correct owner of the account", () => {
    cy.intercept('POST', Cypress.env('face_auth_uri'), {
        body: {
            "authenticated": true
        }
    });
})

When("he looks at the camera and presses the authentication button", () => {
    cy.contains('AUTH NOW').click();
})

Then("the user will be redirected to the success page", () => {
    cy.contains('try again').should('not.exist');
})


// Scenario: Using facial recognition but wrong user

Given("the user is not the account owner", () => {
    cy.intercept('POST', Cypress.env('face_auth_uri'), {
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
    cy.wait(500);
    Step(this, 'he looks at the camera and presses the authentication button');
    cy.wait(500);
    Step(this, 'he looks at the camera and presses the authentication button');
    cy.wait(500);
})

Then('he will be redirected to the pin authentication page', () => {
    cy.wait(1000);
    cy.get('input', {timeout: 25000}).should('have.length', 4);
    cy.get('button');
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
    cy.intercept('POST', Cypress.env('pin_auth_uri'), {
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
    const pin = '1111';
    for (let i = 0; i < pin.length; i++) {
        const char = pin.charAt(i);
        cy.get('input').eq(i).type(char);
        cy.wait(100);
    }
    cy.intercept('POST', Cypress.env('pin_auth_uri'), {
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
