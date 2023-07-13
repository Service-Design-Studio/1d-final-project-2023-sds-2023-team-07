import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('I am a registered user with past transactions corresponding to "transactions.json"', () => {
    cy.intercept('GET', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/users/1/transactions', {
        statusCode: 200,
        fixture: 'transactions.json'
    })
})


Given("I visit the homepage", () => {
    cy.visit('/')
})

Then("I should see the homepage with my most recent transaction at the top", () => {
    cy.get('#transactions tbody tr:first')
    .find('td')
    // .then(($td) => {
    //     return {
    //         date: Date($td[0].innerText),
    //         amount: Number($td[1].innerText),
    //         bal: Number($td[2].innerText)
    //     }
    // })
    // .should('deep.equal', {
    //     date: Date('2023-07-05'),
    //     amount: 1,
    //     bal: 1440
    // })
    .then(($td) => {
        return {
            date: $td[0].innerText,
            amount: $td[1].innerText,
            bal: $td[2].innerText
        }
    })
    .should('deep.equal', {
        date: '7/5/2023',
        amount: '+1.0',
        bal: '1440.00'
    })
})


Given('I am unable to connect to the server', () => {
    cy.intercept('GET', 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/users/1/transactions', {
        statusCode: 400,
    });
})

Then('I will see an empty screen', () => {
    cy.get('table').should('not.exist');
})

Given('an error message', () => {
    cy.contains('Sorry our services seem to be down at the moment');
})

Then('a suggestion to rectify the error', () => {
    cy.contains('Try again in around 30 mins')
})

Then('a button to refresh', () => {
    cy.get('#refreshButton').click();
    cy.url().should(
        'be.equal',
        `${Cypress.config("baseUrl")}/`
    )
})


When('I scroll up the transaction panel', () => {
    cy.get('#transactions').parent().scrollTo('bottom');
})

Then('I should see my earlier transactions', () => {
    cy.get('#transactions tbody tr').last().should('be.visible')
})