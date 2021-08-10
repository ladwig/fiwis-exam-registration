import {body, text, reuseFunctions } from "../helper"

describe('Checking all admin / examiner options', () => {
  beforeEach(() => {
    reuseFunctions.setTimeDate()
    reuseFunctions.getProfCardInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    reuseFunctions.chooseRoomInterception()
    expect(cy.contains(body[0].names))
    reuseFunctions.scanAdminCard()
    reuseFunctions.postScannedCardInterception()
    expect(cy.contains(text.popupHeadline, { matchCase: false }))
  })

  it('Open admin popup and show all buttons', () => {
    expect(cy.get("button").contains(text.cancelButton, { matchCase: false }))
    expect(cy.get("button").contains(text.restartButton, { matchCase: false }))
    expect(cy.get("button").contains(text.startButton, { matchCase: false }))
  })

  it('Close popup', () => {
    cy.get("button").contains(text.cancelButton, { matchCase: false }).click()
    cy.contains(text.cancelButton, {matchCase: false}).should("not.exist")
    cy.contains(body[0].names).should("exist")
  })

  it('Restart app by reloading window', () => {
    cy.get("button").contains(text.restartButton, { matchCase: false }).click()
    expect(cy.contains(text.chooseRoom))
  })

  it('Start register mode', () => {
    reuseFunctions.getProfCardStartExamInterception()
    cy.get("button").contains(text.startButton, { matchCase: false }).click()
    expect(cy.contains(text.registerNow))
  })

})
