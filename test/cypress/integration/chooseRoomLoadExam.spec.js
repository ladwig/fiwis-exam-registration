import { body, text, reuseFunctions } from "../helper"

describe('Choosing room and load exam', () => {
  beforeEach( () => {
    reuseFunctions.getExamRegistrationStateInterception()
  })
  it('Switch from no exam to exam ', () => {
    cy.clock(new Date(2020, 6, 24, 18, 59, 0),['Date'])
    reuseFunctions.chooseRoomInterception()
    expect(cy.contains(text.noExam))
    expect(cy.contains(text.nextExam))
    cy.tick(240000)
    cy.wait(60000)
    expect(cy.contains(body[0].names))
  })

  it('Display the choosen room', () => {
    reuseFunctions.chooseRoomInterception()
    expect(cy.contains(body[0].names))
  })

  it('Exam takes place right now', () => {
    reuseFunctions.setTimeDate()
    reuseFunctions.chooseRoomInterception()
    expect(cy.contains(body[0].names))
    expect(cy.contains(text.checkRegist))
    expect(cy.contains(text.noDisturb))
  })

  it('Exam takes place in 1h', () => {
    cy.clock(new Date(2020, 6, 24, 19, 19, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    }).as("get")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@get")
    expect(cy.contains(body[0].names))
    expect(cy.contains(text.checkRegist))
  })

  it('Exam takes place in more than 1h', () => {
    cy.clock(new Date(2020, 6, 24, 18, 59, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    }).as("get")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@get")
    expect(cy.contains(text.noExam))
    expect(cy.contains(text.nextExam))
  })

  it('Exam took place more than 1h ago', () => {
    cy.clock(new Date(2020, 6, 24, 22, 1, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    }).as("get")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@get")
    expect(cy.contains(text.noExam))
    expect(cy.contains(text.nextExam))
  })


  it('No exam data from backend', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: [{
      }],
    }).as("get")
    cy.visit('/')
    cy.contains('H.1.1').click()
    cy.wait("@get")
    expect(cy.contains(text.noExam))
    expect(cy.contains(text.nextExam))
  })

})
