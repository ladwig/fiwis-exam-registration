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
  isNotRegistered: "Der Student ist nicht Prüfung angemeldet",
  isNotRegisteredCode: 200,
  nextExamTitle: "Wirtschaft- und IT-Recht",
  nextExamRoom: "VCC",
  noNextExam:  "Keine weitere Prüfung gefunden",
  startButton: "registierung",
  registerNow: "Prüfung anmelden",

}

describe('All possible studentcard inputs and responses', () => {

  beforeEach(() => {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])

  })

/*  it('No exam in room and showing next exam ', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: [{}]
    }).as("getRoom")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@getRoom")
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
    }).as("getCard")
    cy.wait("@getCard")
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
    }).as("getRoom")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@getRoom")
    cy.get("input").type("12")
    cy.intercept("GET", "/examgroups?cardnumber=18", {
      statusCode: 200,
      body: []
    }).as("getCard")
    cy.wait("@getCard")
    expect(cy.contains(text.noNextExam))
    cy.tick(4000)
    cy.contains(text.noNextExam).should("not.exist")
  })

  it('Exam in room right now and student is registered', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body
    }).as("getRoom")

    cy.intercept("GET", "/examgroups/4000/scannedcards/8000", {
      statusCode: 200,
      body: {
        returnCode: text.isRegisteredCode,
        returnText: text.isRegistered
      },
    }).as("getCard")

    cy.intercept("POST", '/examgroups/4000/scannedcards', (req) => {
      req.reply({
        headers: {
          "location": "/4000/scannedcards/8000"
        }
      })
    }).as("postCard")

    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@getRoom")
    cy.get("input").type("12")
    cy.wait("@postCard")
    expect(cy.contains(text.isRegistered))
    cy.tick(4000)
    cy.contains(text.isRegistered).should("not.exist")
  })

  it('Exam in room right now and student is not registered', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body
    }).as("getRoom")

    cy.intercept("GET", "/examgroups/4000/scannedcards/8000", {
      statusCode: 200,
      body: {
        returnCode: text.isNotRegistered,
        returnText: text.isNotRegistered
      },
    }).as("getCard")

    cy.intercept("POST", '/examgroups/4000/scannedcards', (req) => {
      req.reply({
        headers: {
          "location": "/4000/scannedcards/8000"
        }
      })
    }).as("postCard")

    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@getRoom")
    cy.get("input").type("12")
    cy.wait("@postCard")
    expect(cy.contains(text.isNotRegistered))
    cy.tick(4000)
    cy.contains(text.isNotRegistered).should("not.exist")
  })*/

  it('Exam registration mode active and student is registered', () => {

    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body
    }).as("getRoom")

    cy.intercept("GET", "/examgroups/4000/scannedcards/8000", {
      statusCode: 200,
      body: {
        returnCode: text.isRegistered,
        returnText: text.isRegistered
      },
    }).as("getStudentCard")

    cy.intercept("GET", "/examgroups/4000/scannedcards/6000", {
      statusCode: 200,
      body: {
        returnCode: 300,
        returnText: "Prof"
      },
    }).as("getProfCard")

    cy.intercept("GET", "/examgroups/4000/scannedcards/1000", {
      statusCode: 200,
      body: {
        returnCode: 400,
        returnText: "xxx"
      },
    }).as("getProfStartCard")

    cy.intercept("GET", "/examgroups/4000/examrooms", {
      statusCode: 200,
      body: {
        numberOfStudentsPlannedInRoom: 20,
        numberOfStudentsPresentInRoom: 10
      },
    }).as("updateStudentsInRoom")


    cy.intercept("POST", '/examgroups/4000/scannedcards', (req) => {
      if(req.body.idcardnumber == "19") {
        req.alias = "postProfCard"
        req.reply({
          headers: {
            "location": "/4000/scannedcards/6000"
          }
        })
      }
      if(req.body.idcardnumber == "18") {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/8000"
          }
        })
        req.alias = "postStudentCard"
      }
      if(req.body.parameter == "1") {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/1000"
          }
        })
        req.alias = "postProfStartCard"
      }
    })

    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@getRoom")
    expect(cy.contains(body[0].names))
    cy.get("input").type("13")
    cy.wait("@postProfCard")
    cy.get("button").contains(text.startButton, { matchCase: false }).click()
    cy.wait("@postProfStartCard")
    expect(cy.contains(text.registerNow))

  })

})
