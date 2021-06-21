const body = [ {
  id: 4000,
  names: "Technischer Datenschutz",
  roomNames: "H.1.1",
  totalNumberOfParticipants: 50,
  startTime: new Date(2020, 6, 24, 20, 0, 0),
  stopTime: new Date(2020, 6, 24, 21, 0, 0),
}]

const text = {
  popupHeadline: "registrierung",
  cancelButton: "abbrechen",
  restartButton: "neu starten",
  startButton: "start",
  registerNow: "Prüfung anmelden",
  chooseRoom: "einen Raum",
}

describe('Checking all admin / examiner options', () => {
  beforeEach(() => {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    })

    cy.intercept("GET", "/examgroups/4000/scannedcards/6000", {
      statusCode: 200,
      body: {
        returnCode: 300,
        returnText: "Prof"
      },
    })

    cy.visit('/')
    cy.contains('H.1.1').click()
    expect(cy.contains(body[0].names))
    cy.get("input").type("13")
    cy.intercept("POST", '/examgroups/4000/scannedcards', (req) => {
      req.reply({
        headers: {
          "location": "/4000/scannedcards/6000"
        }
      })
    }).as("connection")
    cy.wait("@connection")
  })

  it('Open admin popup and show all buttons', () => {
    expect(cy.contains(text.popupHeadline, { matchCase: false }))
    expect(cy.contains(text.cancelButton, { matchCase: false }))
    expect(cy.contains(text.restartButton, { matchCase: false }))
    expect(cy.contains(text.startButton, { matchCase: false }))
  })

  it('Just close popup', () => {
    cy.contains(text.cancelButton, { matchCase: false }).click()
    cy.contains(text.cancelButton, {matchCase: false}).should("not.exist")
    cy.contains(body[0].names).should("exist")
  })

  it('Restart app by reloading window', () => {
    cy.contains(text.restartButton, { matchCase: false }).click()
    expect(cy.contains(text.chooseRoom))
  })


//Start register mode

})
