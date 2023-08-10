import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Successful sign up

Given("I am a new valid user to the app", function () {
  cy.wrap({
    name: "fuckyou",
    nric: "fuckyouryanpey",
    pin: "1234",
  }).as("userDetails");
});

Given("I open the login page", function () {
  cy.visit("/");
});

Given("I press the sign up button", function () {
  cy.get("button").contains("SIGNUP").click();
});

When("I enter my details", function () {
  cy.get("input").type(this.userDetails.name);
  cy.get("button").contains("Next").click();
  cy.get("input").type(this.userDetails.nric);
  cy.get("button").contains("Next").click();
});

When("set a PIN", function () {
  for (let i = 0; i < this.userDetails.pin.length; i++) {
    const char = this.userDetails.pin.charAt(i);
    cy.get("input").eq(i).type(char);
    cy.wait(100);
  }
  cy.get("button").contains("Submit").click();
});

When("register my face", function () {
  cy.wait(1000);
  // cy.visit('/stream');
  cy.wait(1000);
  cy.get("button").contains("NEXT", { timeout: 60000 }).click();
});

Then("I should be registered as a user", function () {
  cy.wait(1000);
  // cy.request
});

Then("I should be directed to the transactions history page", function () {
  cy.url().should("include", "/transactionHistory");
});

Then("I should see no previous transactions", function () {
  cy.get("#transactions tbody tr").should("have.length", 0);
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('backend_uri')}/user`,
    credentials: 'include',
  })
});

// Scenario: Invalid user name

Given("I am a new user to the app", function () {
  cy.wait(1000);
});

When("I enter a name with invalid characters", function () {
  cy.wait(1000);
});

Then(
  "I should see a message telling me that I entered an invalid user name containing disallowed characters",
  function () {
    cy.wait(1000);
  }
);

Then("I should not be able to move on to the next page", function () {
  cy.wait(1000);
});
