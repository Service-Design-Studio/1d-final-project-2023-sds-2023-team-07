import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Background: Selected deposit on the home page
Given("I am on the home page", () => {
  // cy.intercept("GET", Cypress.env("transactions_uri")).as("getTransactions");
  cy.login("S1234567G", "0000");
  cy.visit("/");
  // cy.wait("@getTransactions");
});

When('I click the "Deposit" button', () => {
  // cy.contains("DEPOSIT").click();
});

When("successfully authenticate", () => {
  cy.intercept("POST", Cypress.env("face_auth_uri"), {
    body: {
      authenticated: true,
    },
  });
  // cy.contains("AUTH NOW", { timeout: 10000 }).click();
});

Then("I should see a page asking to confirm that I want to deposit", () => {
  // cy.contains("Confirm to Deposit?", { timeout: 10000 });
  // cy.get("button").contains("NO");
  // cy.get("button").contains("YES");
});

// Scenario: Successful deposit

Given("I am on the confirm to deposit page", () => {});

When('I click on the "Yes" button', () => {
  // cy.get("button").contains("YES").click();
});

When("I see a QR code to scan", () => {
  // cy.get("svg");
});

When("I succesfully complete the deposit on the ATM", () => {
  cy.intercept("GET", "https://kelvin-build-ml42q3c3ya-as.a.run.app/users/1", {
    body: {
      is_active: 1,
    },
  });
});

Then("I should see a success page", () => {
  // cy.contains("Success!");
  // cy.get("button").contains("BACK TO MAIN PAGE");
});

// Scenario: Unsuccessful deposit

When("I fail to complete the deposit on the ATM", () => {
  cy.intercept("GET", "https://kelvin-build-ml42q3c3ya-as.a.run.app/users/1", {
    body: {
      is_active: 2,
    },
  });
});

Then("I should see a failure page", () => {
  // cy.contains(
  //   "Sorry, something when wrong with our ATM, please try again later!"
  // );
  // cy.get("button").contains("BACK TO HOMEPAGE");
});

// Scenario: "No" to confirm to deposit

When('I click on the "No" button', () => {
  // cy.get("button").contains("NO").click();
});

Then("I should be directed back to the home page", () => {
  cy.url().should("be.equal", `${Cypress.config("baseUrl")}/transactionHistory`);
});
