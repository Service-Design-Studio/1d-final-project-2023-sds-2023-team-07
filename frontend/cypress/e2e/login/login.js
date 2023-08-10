import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Successful login

Given("I am a registered user of the app", function () {});

Given("I open the login page", function () {
  cy.visit("/");
  cy.get("button").contains("LOGIN").click();
});

When("I enter my NRIC", function () {
  cy.get("input").type("S1234567G");
  cy.get("button").contains("Next").click();
});

When("I enter my PIN", function () {
  const pin = "0000";
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charAt(i);
    cy.get("input").eq(i).type(char);
    cy.wait(100);
  }
  cy.get("button").contains("AUTH NOW").click();
});

Then("I should see be directed to the transactions history page", function () {
  cy.url().should("include", "/transactionHistory");
});

// Scenario: Incorrect NRIC

When("enter a wrong NRIC", function () {});

Then(
  "I should see a message telling me that the user does not exist",
  function () {}
);

Then("a link directing me to sign up", function () {});

// Scenario: Fail authentication

When("I enter the wrong PIN", function () {
  const pin = "1111";
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charAt(i);
    cy.get("input").eq(i).type(char);
    cy.wait(100);
  }
  cy.intercept("POST", `${Cypress.env("backend_uri")}/api/cookie/login`, {
    statusCode: 200,
    body: {
      logged_in: false,
    },
  });
  cy.get("button").contains("AUTH NOW").click();
});

Then(
  "I should see a message telling me that the PIN is incorrect",
  function () {
    cy.contains("Incorrect Pin");
  }
);
