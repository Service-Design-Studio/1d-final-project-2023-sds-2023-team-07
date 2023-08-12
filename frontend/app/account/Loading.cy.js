import React from 'react'
import Loading from './loading'

describe('<Loading />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Loading />)
  })

  it('has the correct text', () => {
    cy.mount(<Loading />)
    cy.contains('Loading...')
  })
})