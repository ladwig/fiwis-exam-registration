const body = [ {
  id: 4000,
  names: "Technischer Datenschutz",
  roomNames: "H.1.1",
  totalNumberOfParticipants: 50,
  startTime: new Date(2020, 6, 24, 20, 0, 0),
  stopTime: new Date(2020, 6, 24, 21, 0, 0),
}]

const text = {
  error: "fehler",
  okay: "okay",
}

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

  it('No connection after card input when exam exam', () => {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    })
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.get("input").type("13")
    expect(cy.contains(text.error, { matchCase: false }))
    cy.contains(text.okay, { matchCase: false }).click()
    cy.get("input").type("13")
  })

})
