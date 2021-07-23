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
  })

  it('Open admin popup and show all buttons', () => {
    expect(cy.contains(text.popupHeadline, { matchCase: false }))
    expect(cy.get("button").contains(text.cancelButton, { matchCase: false }))
    expect(cy.get("button").contains(text.restartButton, { matchCase: false }))
    expect(cy.get("button").contains(text.startButton, { matchCase: false }))
  })

  it('Close popup', () => {
    expect(cy.contains(text.popupHeadline, { matchCase: false }))
    cy.get("button").contains(text.cancelButton, { matchCase: false }).click()
    cy.contains(text.cancelButton, {matchCase: false}).should("not.exist")
    cy.contains(body[0].names).should("exist")
  })

  it('Restart app by reloading window', () => {
    expect(cy.contains(text.popupHeadline, { matchCase: false }))
    cy.get("button").contains(text.restartButton, { matchCase: false }).click()
    expect(cy.contains(text.chooseRoom))
  })

  it('Start register mode', () => {
    reuseFunctions.getProfCardStartExamInterception()
    expect(cy.contains(text.popupHeadline, { matchCase: false }))
    cy.get("button").contains(text.startButton, { matchCase: false }).click()
    cy.wait(4000)
    expect(cy.contains(text.registerNow))
  })

})
