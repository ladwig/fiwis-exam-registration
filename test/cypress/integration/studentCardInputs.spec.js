import { body, text, reuseFunctions } from "../helper"

describe('All possible studentcard inputs and responses', () => {

  beforeEach(() => {
    reuseFunctions.setTimeDate()
  })

  it('No exam in room and showing next exam ', () => {
  reuseFunctions.chooseRoomInterception(true)
  reuseFunctions.scanAStudentCard()
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
    reuseFunctions.scanAStudentCard()
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
    reuseFunctions.chooseRoomInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    reuseFunctions.getStudentCardIsRegistInterception()
    reuseFunctions.postScannedCardInterception()


    reuseFunctions.scanAStudentCard()
    expect(cy.contains(text.StudentCardIsRegist))
    cy.tick(4000)
    cy.contains(text.StudentCardIsRegist).should("not.exist")
  })

  it('Exam in room right now and student is not registered', () => {
    reuseFunctions.chooseRoomInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    expect(cy.contains(body[0].names))
    reuseFunctions.getStudentCardNotRegistInterception()
    reuseFunctions.postScannedCardInterception()
    cy.get("input").type(text.notStudentCardIDRaw)

    expect(cy.contains(text.StudentCardIsNotRegist))
    cy.tick(4000)
    cy.contains(text.StudentCardIsNotRegist).should("not.exist")
  })

  it('Exam registration mode active and 1x registered, 1x not registered card', () => {
    reuseFunctions.getProfCardInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    reuseFunctions.chooseRoomInterception()
    expect(cy.contains(body[0].names))
    reuseFunctions.scanAdminCard()
    reuseFunctions.postScannedCardInterception()
    reuseFunctions.getProfCardStartExamInterception()
    reuseFunctions.updateNumberOfStudentsInRoomInRoomInterception()
    reuseFunctions.getStudentCardIsCheckedInInterception()
    reuseFunctions.getStudentCardIsNotCheckedInInterception()

    expect(cy.contains(text.popupHeadline, { matchCase: false }))
    cy.get("button").contains(text.startButton, { matchCase: false }).click()
    cy.wait(4000)
    expect(cy.contains(text.registerNow))

    cy.get("input").type(text.studentCardIDRaw)

    expect(cy.contains(text.StudentCardIsCheckedIn))
    cy.wait(4000)
    expect(cy.contains(text.registerNow))

    cy.get("input").type(text.notStudentCardIDRaw)
    expect(cy.contains(text.StudentCardIsNotCheckedIn))
    cy.wait(4000)
    expect(cy.contains(text.registerNow))
  })

})
