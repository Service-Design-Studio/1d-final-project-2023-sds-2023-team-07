import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Successful sign up

Given("I am a new valid user to the app", function () {
  cy.wrap({
    name: "Cypress Test 1",
    nric: "S0000000A",
    pin: "0000",
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
  cy.get("button").contains("NEXT", { timeout: 60000 }).click();
});

Then("I should be registered as a user", function () {
  cy.wait(1000);
  cy.request("GET", `${Cypress.env("backend_uri")}/users`).then((response) => {
    const new_user_idx = response.body.length - 1;
    expect(response.body[new_user_idx]).to.have.property(
      "name",
      this.userDetails.name
    );
    expect(response.body[new_user_idx]).to.have.property(
      "identification_number",
      this.userDetails.nric
    );
    expect(response.body[new_user_idx]).to.have.property(
      "pin",
      this.userDetails.pin
    );
  });
});

Then("I should be directed to the transactions history page", function () {
  cy.url().should("include", "/transactionHistory");
});

Then("I should see no previous transactions", function () {
  cy.get("#transactions tbody tr").should("have.length", 0);
  cy.getCookie("_your_app_session")
    .should("exist")
    .then((cookie) => {
      cy.log(cookie);
      cy.request({
        method: "DELETE",
        url: `${Cypress.env("backend_uri")}/user`,
        headers: {
          Cookie: cookie.value,
        },
        failOnStatusCode: false,
      });
    });
});

// Scenario: Invalid user name

Given("I am a new user to the app", function () {
});

When("I get to the NRIC page", function () {
  cy.get("button").contains("Next").click();
});

When("I enter text that is not an NRIC", function () {
  cy.get("input").type("this is not an NRIC!=+@");
});

Then(
  "I should see a message telling me that I entered an invalid NRIC",
  function () {
    cy.contains("Please enter a valid NRIC");
  }
);

Then("I should not be able to move on to the next page", function () {
  cy.get("button").contains("Next").click();
});
