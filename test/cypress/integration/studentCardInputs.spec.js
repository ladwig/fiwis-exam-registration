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
  isRegisteredCode: 500,
  nextExamTitle: "Wirtschaft- und IT-Recht",
  nextExamRoom: "VCC",
  noNextExam:  "Keine weitere Prüfung gefunden"

}

describe('All possible studentcard inputs and responses', () => {

  beforeEach(() => {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])

  })

  it('No exam in room and showing next exam ', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: [{}]
    }).as("get")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@get")
    cy.get("input").type("12")
    cy.intercept("GET", "/examgroups?cardnumber=18", {
      statusCode: 200,
      body: [
        {
          names: text.nextExamTitle,
          roomNames: text.nextExamRoom,
          startTime: "2021-04-21T15:00:00",
          stopTime: "2021-04-21T16:00:00"
        }]
    }).as("connection")
    cy.wait("@connection")
    expect(cy.contains(text.nextExamTitle))
    expect(cy.contains(text.nextExamRoom))
    cy.tick(4000)
    cy.contains(text.nextExamTitle).should("not.exist")
    cy.contains(text.nextExamRoom).should("not.exist")

  })

  it('No exam in room and showing next exam ', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: [{}]
    }).as("get")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@get")
    cy.get("input").type("12")
    cy.intercept("GET", "/examgroups?cardnumber=18", {
      statusCode: 200,
      body: []
    }).as("connection")
    cy.wait("@connection")
    expect(cy.contains(text.noNextExam))
    cy.tick(4000)
    cy.contains(text.noNextExam).should("not.exist")
  })

  it('Exam and student is registered', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body
    }).as("get")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@get")
    cy.get("input").type("12")
    cy.intercept("GET", "/examgroups/4000/scannedcards/5000", {
      statusCode: 200,
      body: {
        returnCode: text.isRegisteredCode,
        returnText: text.isRegistered
      },
    }).as("connection")
    cy.wait("@connection")
    expect(cy.contains(text.isRegistered))
    cy.tick(4000)
    cy.contains(text.isRegistered).should("not.exist")
  })

})
