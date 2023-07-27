import { Given, Step, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Clicking Deposit at Home Page
Given("I am at Home Page", () => {
    cy.visit('/');
})

When("I click on the “Deposit” button", () => {
    cy.contains('DEPOSIT').click();
})

Then("I should be directed to the Confirm to Deposit Page", () => {
    cy.url().should('include', '/confirmdeposit'); // change beware of the uri name
})

// Scenario: Can't connect to server
When('the server is down', () => {
    cy.intercept('GET', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/users/1/transactions', {
        statusCode: 400,
    });
})

Then("I should see an error pop-up that states “Try Again”", () => {
    cy.contains('Sorry our services seem to be down at the moment'); //change change if the error notif is not the same as sprint 2
})


// Scenario: “No” to Confirm to Deposit
Given("I am on the Confirm to Deposit Page", () => {
    cy.visit('/confirmdeposit'); // change beware of the uri name
})

When("I click on the “No” button", () => {
    cy.contains('NO').click();
})

Then("I should be directed to the Home Page", () => {
    cy.url().should('eq', cy.config().baseUrl); // change check if url is slash
})


// Scenario: “Yes” to Confirm to Deposit
When("I click on the “Yes” button", () => {
    cy.contains('YES').click();
})

Then('I should be directed to the Authentication Page" message', () => {
    cy.url().should('include', '/camera');
})


// Scenario: Authentication Page 
Given("I am on the Authentication Page ", () => {
    cy.visit('/camera');
})

When("I click on the “Auth Now” button", () => {
    cy.contains('AUTH NOW').click();
})

When('I am the right user ', () => {  
    cy.intercept('POST', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/face', {
        body: {
            "authenticated": true
        }
    });
})

Then("I should be directed to the QR Connection Page", () => {
    cy.url().should('include', '/qrconnection'); // change beware of the uri name
})

Then("I should see a QR code", () => {
    cy.contains('qrimg'); // change image name or id
})

// Scenario: Scan Successful
Given("I am on the QR Connection Page", () => {
    cy.visit('/qrconnection'); // Change the URI to the correct path for the QR Connection Page
})

When("I use the QR reader to scan my QR code", () => {
    // change a wait post back from atm
})

Then("I should be directed to the Look At ATM Page", () => {
    cy.url().should('include', '/lookatatm'); // Change the URI to the correct path for the Loading Page
})


// Scenario: Scan Unsuccessful
Given("the QR code is invalid", () => {
    // change to put an invalid QR code
})

When("I use the QR reader to scan my QR code", () => {
    // change a wait post back from atm
})

Then("I should see an error pop-up that states “Try Again”", () => {
    cy.contains('Try Again').should('be.visible');
})

// Scenario: Look At ATM to Success Page
Given("I am at the Look At ATM Page", () => {
    cy.visit('/lookatatm'); // Change the URI to the correct path for the Loading Page
})

When("my account has been updated", () => {
    // change intercept request with updated values
})

Then("I should be directed to the Success Page", () => {
    cy.url().should('include', '/success'); // Change the URI to the correct path for the Success Page
})

Then("I should see “Transaction Success”", () => {
    cy.contains('Transaction Success').should('be.visible'); // change success name
})

Then("I should see my new account balance", () => {
    cy.contains('Your bank account now has:').should('be.visible'); // change  
    cy.contains('new balance variable').should('not.have.text', 'None'); // change either placeholder
})

// Scenario: Success to Home Page
Given("I am at the Success Page", () => {
    cy.visit('/success'); // change uri name
})

When("I click on the “Return to Home Page” button", () => {
    cy.contains('Return to Home Page').click();
})

Then("I should be directed to the Home Page", () => {
    cy.url().should('eq', cy.config().baseUrl); 
})

And("I should see an updated table", () => {
    cy.get('#transactions tbody tr:first').should('be.visible');
})








// Withdraw
// Happy path
// Scenario: Clicking Withdraw at Home Page
// Given("I am at Home Page", () => {
//     cy.visit('/'); // Change the URI to the correct path for the Home Page
// })

When("I click on the “Withdraw” button", () => {
    cy.contains('WITHDRAW').click();
})

Then("I should be directed to the Authentication Page", () => {
    cy.url().should('include', '/camera'); // Change the URI to the correct path for the Authentication Page
})

// Sad path
// Scenario: Can’t connect to server
// No need to fill up since same as above

// Scenario: Authentication Page
Then("I should be directed to the Withdrawal Page", () => {
    cy.url().should('include', '/withdrawal'); // Change the URI to the correct path for the Withdrawal Page
})

// Scenario: Clicking Any Amount at Withdrawal Page
Given("I am at Withdrawal Page", () => {
    cy.visit('/withdrawal'); // Change the URI to the correct path for the Withdrawal Page
})

When("I click on a box containing a number", () => {
    cy.contains('').click(); // change
})

Then("I should be directed to the Confirm to Withdraw page", () => {
    cy.url().should('include', '/confirmwithdraw'); // Change the URI to the correct path for the Confirm to Withdraw Page
})

And("I should see that number as well", () => {
    cy.contains(''); // change
})

// Scenario: “No” to Confirm to Withdraw
Given("I am on the Confirm to Withdraw Page", () => {
    cy.visit('/confirmwithdraw'); // Change the URI to the correct path for the Confirm to Withdraw Page
})

When("I click on the “No” button", () => {
    cy.contains('NO').click();
})

Then("I should be directed to the Withdrawal Page", () => {
    cy.url().should('include', '/withdrawal'); // Change the URI to the correct path for the Withdrawal Page
})

// Scenario: “Yes” to Confirm to Withdraw
Given("I am on the Confirm to Withdraw Page", () => {
    cy.visit('/confirmwithdraw'); // Change the URI to the correct path for the Confirm to Withdraw Page
})

When("I click on the “Yes” button", () => {
    cy.contains('YES').click();
})

Then("I should be directed to the QR Connection Page", () => {
    cy.url().should('include', '/qrconnection'); // Change the URI to the correct path for the QR Connection Page
})

And("I should see a QR code", () => {
    // change Assert the presence of the QR code on the QR Connection Page
})

// Happy path
// Scenario: Scan successful
Given("I am on the QR Connection Page", () => {
    cy.visit('/qrconnection'); // Change the URI to the correct path for the QR Connection Page
})

When("I use the QR reader to scan my QR code", () => {
    // Implement QR code scanning with your QR reader code
    // For testing purposes, you can simulate the successful scan by triggering a successful event.
    // For example, you can use cy.get('[data-testid="qr-code"]').trigger('success');
})

Then("I should be directed to the Look At ATM Page", () => {
    cy.url().should('include', '/lookatatm'); // Change the URI to the correct path for the Look At ATM Page
})

// Sad path
// Scenario: Scan unsuccessful
Given("I am on the QR Connection Page", () => {
    cy.visit('/qrconnection'); // Change the URI to the correct path for the QR Connection Page
})

And("the QR code is invalid", () => {
    // For testing purposes, you can simulate an invalid QR code by triggering an error event.
    // For example, you can use cy.get('[data-testid="qr-code"]').trigger('error', 'Invalid QR code');
})

When("I use the QR reader to scan my QR code", () => {
    // Implement QR code scanning with your QR reader code
})

Then("I should see an error pop-up that states “Try Again”", () => {
    cy.contains('Try Again').should('be.visible');
})

// Scenario: Loading to Success Page
Given("I am at the Look At ATM Page", () => {
    cy.visit('/lookatatm'); // Change the URI to the correct path for the Look At ATM Page
})

When("my account has been updated", () => {
    // For testing purposes, you can simulate the account update by waiting for a moment using cy.wait()
    // For example, you can use cy.wait(2000); // Wait for 2 seconds to simulate the account update
})

Then("I should be directed to the Success Page", () => {
    cy.url().should('include', '/success'); // Change the URI to the correct path for the Success Page
})

And("I should see “Transaction Success”", () => {
    cy.contains('Transaction Success').should('be.visible');
})

And("I should see my new account balance", () => {
    // Assert the presence of the new account balance element on the Success Page
    cy.contains('New Account Balance').should('be.visible');
})

// Scenario: Success to Home Page
Given("I am at the Success Page", () => {
    cy.visit('/success'); // Change the URI to the correct path for the Success Page
})

When("I click on the “Return to Home Page” button", () => {
    cy.contains('Return to Home Page').click();
})

Then("I should be directed to the Home Page", () => {
    cy.url().should('eq', cy.config().baseUrl); // Change the URL check to match the Home Page URL
})

And("I should see an updated table", () => {
    // Assert the presence of the updated table on the Home Page
    cy.get('[data-testid="table"]').should('be.visible');
})
