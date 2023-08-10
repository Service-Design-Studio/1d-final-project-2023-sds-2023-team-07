import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";


// Background: Selected withdraw on the home page

Given("I am on the home page", () => {
    cy.login('S1234567G', '0000')
    cy.intercept("GET", Cypress.env("transactions_uri")).as("getTransactions");
    cy.visit("/");
    // cy.wait("@getTransactions");
  });

When('I click the "Withdraw" button', () => {
    // cy.contains('WITHDRAW').click();
    cy.wait(1000);
})

When("successfully authenticate", () => {
    cy.intercept("POST", Cypress.env("face_auth_uri"), {
      body: {
        authenticated: true,
      },
    });
    // cy.contains("AUTH NOW", { timeout: 10000 }).click();
  });

Then('I should see a page asking for the amount I want to withdraw', () => {
    // cy.contains('SELECT');
    // cy.get('button').contains('$10');
    // cy.get('button').contains('$20');
    // cy.get('button').contains('$50');
    // cy.get('button').contains('$100');
    // cy.get('button').contains('$200');
    // cy.get('button').contains('$500');
})


// Scenario: Successful withdrawal

Given('I am on the withdraw amount selection page', () => {})

When('I click on the $100 button', () => {
    // cy.get('button').contains('$100').click();
})

When('I see a page asking to confirm that I want to deposit $100', () => {
    // cy.contains('Confirm to Withdraw 100 ?');
})

When('I click on the "Yes" button', () => {
    // cy.get("button").contains("YES").click();
  });

When("I see a QR code to scan", () => {
    // cy.get("svg");
  });

When('I succesfully complete the withdrawal on the ATM', () => {
    cy.intercept('GET', 'https://kelvin-build-ml42q3c3ya-as.a.run.app/users/1', {
        body: {
            "is_active": 1
        }
    });
})

Then("I should see a success page", () => {
    // cy.contains("Success!");
    // cy.get("button").contains("BACK TO MAIN PAGE");
  });


// Scenario: Unsuccessful withdrawal

When('I fail to complete the transaction on the ATM', () => {
    cy.intercept('GET', 'https://kelvin-build-ml42q3c3ya-as.a.run.app/users/1', {
        body: {
            "is_active": 2
        }
    });
})

Then("I should see a failure page", () => {
    // cy.contains(
    //   "Sorry, something when wrong with our ATM, please try again later!"
    // );
    // cy.get("button").contains("BACK TO HOMEPAGE");
  });

// Scenario: Return to homepage

When('I click on the return to homepage button', () => {
    // cy.get('button').contains('RETURN TO HOMEPAGE').click();
})

Then("I should be directed back to the home page", () => {
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/transactionHistory`);
  });