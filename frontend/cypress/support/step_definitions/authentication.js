import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

//Scenario: Accessing camera app for facial recognition
Given("the user is at the transaction history page with the deposit and withdraw buttons", () => {
    cy.visit('/')
})
Given("he has camera permissions set to allowed", () => {})
When("he clicks on the deposit or withdrawal button", () => {
    cy.get('button.chakra-button.grow.css-41aesz').click({ multiple: true })
})
Then("he is directed to the facial authentication page", () => {
    cy.visit('/camera')
})
Then("there is a button to navigate back to the transaction history page", () => {})

//Scenario: Accessing camera app for facial recognition but unintended
Given("the user is on the facial authentication page", () => {
    cy.visit('/camera')
})
When("he clicks on the button to navigate back to the transaction history page", () => {})
Then("he is directed to the transaction history page", () => {
    // cy.url().should('eq', '/')
})

//Scenario: Using facial recognition
When("he looks at the camera and 3 seconds has passed", () => {
    cy.wait(//insert variable here eg. @getTrue
        )
})
Then("the user will be redirected to the transaction amount page", () => {
    // can use either 'eq' or include
    cy.url().should('eq', '/')
    // cy.url().should('include', '/')
})

//Scenario: Using facial recognition but wrong user
Then("the user will receive an 'Authentication Failed, incorrect user' message", () => {})

//Scenario: User cannot authenticate via face and wants to fallback to pin login instead
When("he fails the authentication thrice", () => {})
Then("he will be redirected to the pin authentication page", () => {})
Then("has number boxes to fill in his pin", () => {})

//Scenario: User cannot authenticate via face and wants forgets his login pin
When("he fails the pin authentication page", () => {})
Then("he will be notified of his failure", () => {})
Then("to try again in 1 minute", () => {})