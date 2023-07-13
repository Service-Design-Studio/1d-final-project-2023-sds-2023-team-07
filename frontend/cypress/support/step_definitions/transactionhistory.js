import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I have past transactions defined in transactions.json", () => {})

Given("I am logged into the application", () => {
    cy.intercept('GET', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/users/1/transactions', {
        statusCode: 200,
        fixture: 'transactions.json'
    })
})

When("the homepage is loaded", () => {
    cy.visit('/')
})

Then("I should see the homepage with my most recent transaction at the bottom", () => {
    cy.contains()
})