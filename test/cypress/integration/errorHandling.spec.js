import { body, text, reuseFunctions } from "../helper"

describe('Checking error handling', () => {

  it('No connection after choosing room', () => {
    cy.visit('/')
    cy.contains(body[0].roomNames).click()
    expect(cy.contains(text.error, { matchCase: false }))
  })

  it('No connection after card input when no exam', () => {
    reuseFunctions.chooseRoomInterception(true)
    reuseFunctions.getExamRegistrationStateInterception()
    cy.get("input").type("13")
    expect(cy.contains(text.error, { matchCase: false }))
  })

  it('No connection after card input when exam and close error dialog', () => {
    reuseFunctions.setTimeDate()
    reuseFunctions.chooseRoomInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    cy.get("input").type("13")
    expect(cy.contains(text.error, { matchCase: false }))
    cy.get("button").contains(text.okayButton, { matchCase: false }).click()
    expect(cy.contains(body[0].roomNames))
  })

})
