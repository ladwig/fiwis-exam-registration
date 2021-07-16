import { body, text, reuseFunctions } from "../helper"

describe('All possible studentcard inputs and responses', () => {

  beforeEach(() => {
    reuseFunctions.setTimeDate()
  })

it('No exam in room and showing next exam ', () => {
reuseFunctions.chooseRoomInterception(true)
    cy.get("input").type(text.studentCardIDRaw)
    cy.intercept("GET", `/examgroups?cardnumber=${text.studentCardIDConvert}`, {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-examgroup.exambycardnumberview+json',
      },
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

  it('No exam in room and no next exam ', () => {
    reuseFunctions.chooseRoomInterception(true)
    cy.get("input").type(text.studentCardIDRaw)
    cy.intercept("GET", `/examgroups?cardnumber=${text.studentCardIDConvert}`, {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-examgroup.exambycardnumberview+json',
      },
      body: []
    }).as("getCard")
    cy.wait("@getCard")
    expect(cy.contains(text.noNextExam))
    cy.tick(4000)
    cy.contains(text.noNextExam).should("not.exist")
  })

  it('Exam in room right now and student is registered', () => {


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
    reuseFunctions.chooseRoomInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    cy.get("input").type(text.studentCardIDRaw)
    expect(cy.contains(text.isRegistered))
    cy.tick(4000)
    cy.contains(text.isRegistered).should("not.exist")
  })

  it('Exam in room right now and student is not registered', () => {
    reuseFunctions.chooseRoomInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    cy.get("input").type(text.studentCardIDRaw)
    reuseFunctions.postStudentCardNotRegistInterception()
    reuseFunctions.getStudentCardNotRegistInterception()
    expect(cy.contains(text.isNotRegistered))
    cy.tick(4000)
    cy.contains(text.isNotRegistered).should("not.exist")
  })

  it('Exam registration mode active and 1x registered, 1x not registered card', () => {
    reuseFunctions.chooseRoomInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    expect(cy.contains(body[0].names))
    reuseFunctions.postProfCardInterception()
    reuseFunctions.getProfCardInterception()
    reuseFunctions.getProfCardStartExamInterception()

    cy.intercept("GET", "/examgroups/4000/scannedcards/8000", {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-scannedcard.scannedcardview+json',
      },
      body: {
        returnCode: text.isRegisteredCode,
        returnText: text.isRegistered
      },
    }).as("getStudentCard")


    cy.intercept("GET", "/examgroups/4000/scannedcards/2000", {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-scannedcard.scannedcardview+json',
      },
      body: {
        returnCode: text.isNotRegisteredCode,
        returnText: text.isNotRegistered
      },
    }).as("getNotRegisteredCard")

    cy.intercept("GET", "/examgroups/4000/examrooms", {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-scannedcard.scannedcardview+json',
      },
      body: {
        numberOfStudentsPlannedInRoom: 20,
        numberOfStudentsPresentInRoom: 10
      },
    }).as("updateStudentsInRoom")


    cy.intercept("POST", '/examgroups/4000/scannedcards', (req) => {
      if(req.body.idcardnumber == "18") {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/8000",
            "accept": 'application/vnd.fhws-scannedcard.scannedcardview+json'
          }
        })
        req.alias = "postStudentCard"
      }
      if(req.body.idcardnumber == "20") {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/2000",
            "accept": 'application/vnd.fhws-scannedcard.scannedcardview+json'
          }
        })
        req.alias = "postNotRegisteredCard"
      }
      if(req.body.parameter == 1) {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/1000",
            "accept": 'application/vnd.fhws-scannedcard.scannedcardview+json'
          }
        })
        req.alias = "postProfStartCard"
      }
    })

    cy.get("input").type(text.profCardIDRaw)
    cy.get("button").contains(text.startButton, { matchCase: false }).click()
    cy.wait("@postProfStartCard")
    cy.wait(4000)
    expect(cy.contains(text.registerNow))
    cy.get("input").type("12")
    cy.wait("@postStudentCard")
    cy.wait("@updateStudentsInRoom")
    expect(cy.contains(text.isRegistered))
    cy.wait(4000)
    expect(cy.contains(text.registerNow))
    cy.get("input").type("14")
    cy.wait("@postNotRegisteredCard")
    expect(cy.contains(text.isNotRegistered))
    cy.wait(4000)
    expect(cy.contains(text.registerNow))
  })

})
