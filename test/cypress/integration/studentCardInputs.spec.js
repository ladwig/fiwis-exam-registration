import { body, text, reuseFunctions } from "../helper"

describe('All possible studentcard inputs and responses', () => {

  beforeEach(() => {
    reuseFunctions.setTimeDate()
  })

  it('Exam registration mode active and 1x registered, 1x not registered card', () => {
    reuseFunctions.getProfCardInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    reuseFunctions.chooseRoomInterception()
    reuseFunctions.postScannedCardInterception()
    reuseFunctions.getProfCardStartExamInterception()
    reuseFunctions.getStudentCardIsCheckedInInterception()
    reuseFunctions.getStudentCardIsNotCheckedInInterception()
    reuseFunctions.updateNumberOfStudentsInRoomInRoomInterception()

    expect(cy.contains(body[0].names))
    reuseFunctions.scanAdminCard()
    expect(cy.contains(text.popupHeadline, { matchCase: false }))
    cy.get("button").contains(text.startButton, { matchCase: false }).click()
    cy.wait("@getProfCardStartExam")
    expect(cy.contains(text.registerNow))


    cy.get("input").type(text.studentCardIDRaw)
    expect(cy.contains(text.StudentCardIsCheckedIn))
    cy.contains(text.StudentCardIsCheckedIn).should("not.exist")

    cy.get("input").type(text.notStudentCardIDRaw)
    expect(cy.contains(text.StudentCardIsNotCheckedIn))
    cy.contains(text.StudentCardIsNotCheckedIn).should("not.exist")
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
    //Auto retry .should() until not exist (10sec max)
    cy.contains(text.nextExamTitle).should("not.exist")
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
    cy.contains(text.noNextExam).should("not.exist")
  })

  it('Exam in room right now and student is registered', () => {
    reuseFunctions.chooseRoomInterception()
    reuseFunctions.getExamRegistrationStateInterception()
    reuseFunctions.getStudentCardIsRegistInterception()
    reuseFunctions.postScannedCardInterception()
    reuseFunctions.scanAStudentCard()
    expect(cy.contains(text.StudentCardIsRegist))
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
    cy.contains(text.StudentCardIsNotRegist).should("not.exist")
  })

})
