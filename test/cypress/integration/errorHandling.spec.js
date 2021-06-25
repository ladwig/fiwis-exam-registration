import {body, text} from "../fixtures/helper"

describe('Checking error handling', () => {


  it('No connection after choosing room', () => {
    cy.visit('/')
    cy.contains('H.1.1').click()
    expect(cy.contains(text.error, { matchCase: false }))
  })

  it('No connection after card input when no exam', () => {
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.get("input").type("13")
    expect(cy.contains(text.error, { matchCase: false }))
  })

  it('No connection after card input when exam', () => {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    })
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.get("input").type("13")
    expect(cy.contains(text.error, { matchCase: false }))
    cy.get("button").contains(text.okayButton, { matchCase: false }).click()
    cy.get("input").type("13")
  })

})
