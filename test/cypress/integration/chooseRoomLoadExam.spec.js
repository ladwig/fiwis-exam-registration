const body = [ {
  id: 4000,
  names: "Technischer Datenschutz",
  roomNames: "H.1.1",
  totalNumberOfParticipants: 50,
  startTime: new Date(2020, 6, 24, 20, 0, 0),
  stopTime: new Date(2020, 6, 24, 21, 0, 0),
}]

const text = {
  checkRegist: "Anmeldung prüfen",
  noDisturb: "nicht stören",
  noExam: "keine Prüfung",
  nextExam: "nächste Prüfung",
}

describe('Choosing room and load exam', () => {

  it('Exam takes place right now', () => {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    })
    cy.visit('/')
    cy.contains('H.1.1').click()
    expect(cy.contains(body[0].names))
    expect(cy.contains(text.checkRegist))
    expect(cy.contains(text.noDisturb))
  })

  it('Exam takes place in 1h', () => {
    cy.clock(new Date(2020, 6, 24, 19, 19, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    })
    cy.visit('/')
    cy.contains('H.1.1').click()
    expect(cy.contains(body[0].names))
    expect(cy.contains(text.checkRegist))
  })

  it('Exam takes place in more than 1h', () => {
    cy.clock(new Date(2020, 6, 24, 18, 59, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    })
    cy.visit('/')
    cy.contains('H.1.1').click()
    expect(cy.contains(text.noExam))
    expect(cy.contains(text.nextExam))
  })

  it('Exam took place more than 1h ago', () => {
    cy.clock(new Date(2020, 6, 24, 22, 1, 0), ['Date'])
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    })
    cy.visit('/')
    cy.contains('H.1.1').click()
    expect(cy.contains(text.noExam))
    expect(cy.contains(text.nextExam))
  })


  it('No exam data from backend', () => {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: [{
      }],
    })
    cy.visit('/')
    cy.contains('H.1.1').click()
    expect(cy.contains(text.noExam))
    expect(cy.contains(text.nextExam))
  })
})
