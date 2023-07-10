import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged into the application", () => {
    expect(true).to.equal(true);
})

When("the homepage is loaded", () => {
    cy.visit('http://localhost:3000')
})

Then("I should see the homepage with the correct transaction records", () => {
    cy.contains('WITHDRAW')
})