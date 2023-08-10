import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Background: Registered user

Given("I am a registered user", () => {
  cy.login("ABC123", "1234");
});

// Scenario: Launching the web app and viewing familiar transaction records

Given("I have past transactions", () => {
  cy.intercept("GET", "api/user/getTable", {
    statusCode: 200,
    fixture: "transactions.json",
  });
});

Given("I visit the homepage", () => {
  cy.visit("/transactionHistory");
});

Then(
  "I should see the homepage with my most recent transaction at the top",
  () => {
    cy.get("#transactions tbody tr:first")
      .find("td")
      .then(($td) => {
        return {
          date: $td[0].innerText,
          amount: $td[1].innerText,
          bal: $td[2].innerText,
        };
      })
      .should("deep.equal", {
        date: "7/5/2023",
        amount: "+1.0",
        bal: "1440.00",
      });
  }
);

// Scenario: Reload the web page to retry getting transaction records

Given("I am unable to connect to the server", () => {
  cy.intercept("GET", "api/user/getTable", {
    statusCode: 400,
  });
});

Then("I will see an empty screen", () => {
  cy.get("#transactions tbody tr").should("have.length", 0);
  // cy.get("table").should("not.exist");
});

Given("an error message", () => {
  cy.contains("Sorry our services seem to be down at the moment");
});

Then("a suggestion to rectify the error", () => {
  cy.contains("Try again in around 30 mins");
});

Then("a button to refresh", () => {
  cy.get("#refreshButton").click();
  cy.url().should(
    "be.equal",
    `${Cypress.config("baseUrl")}/transactionHistory`
  );
});

// Scenario: Viewing earlier transactions

When("I scroll up the transaction panel", () => {
  cy.get("#transactions").parent().scrollTo("bottom");
});

Then("I should see my earlier transactions", () => {
  cy.get("#transactions tbody tr").last().should("be.visible");
});
