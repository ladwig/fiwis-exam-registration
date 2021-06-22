const body = [ {
  id: 4000,
  names: "Technischer Datenschutz",
  roomNames: "H.1.1",
  totalNumberOfParticipants: 50,
  startTime: new Date(2020, 6, 24, 20, 0, 0),
  stopTime: new Date(2020, 6, 24, 21, 0, 0),
}]

const text = {
  isRegistered: "Der Student ist zur Prüfung angemeldet",
  isRegisteredCode: 500
}

describe('All possible studentcard inputs and responses', () => {

  before(() => {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])

    cy.intercept("GET", "/examgroups/4000/scannedcards/5000", {
      statusCode: 200,
      body: {
        returnCode: text.isRegisteredCode,
        returnText: text.isRegistered
      },
    })
  })

  it('No exam in room and showing next exam ', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: [{}]
    }).as("get")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@get")
    cy.get("input").type("23") // Hier ansetzen umwandlung von dec/hex, was falsch?!
    cy.intercept("GET", "/examgroups?cardnumber=17", {
      statusCode: 200,
      body: [
        {
          names: "Wirtschaft- und IT-Recht",
          roomNames: "VCC",
          startTime: "2021-04-21T15:00:00",
          stopTime: "2021-04-21T16:00:00"
        }]
    }).as("get").as("connection")
    cy.wait("@connection")

  })
})
