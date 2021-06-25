import {body, text} from "../fixtures/helper"

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
    }).as("getProfCard")


    cy.visit('/')
    cy.contains('H.1.1').click()
    expect(cy.contains(body[0].names))
    cy.get("input").type("13")
    cy.intercept("POST", '/examgroups/4000/scannedcards', (req) => {
      if(req.body.idcardnumber == "19" && !req.body.parameter) {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/6000"
          }
        })
        req.alias = "postProfCard"
      }
      if(req.body.parameter == 1) {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/1000"
          }
        })
        req.alias = "postProfStartCard"
      }
    })
    cy.wait("@postProfCard")
  })

  it('Open admin popup and show all buttons', () => {
    expect(cy.contains(text.popupHeadline, { matchCase: false }))
    expect(cy.get("button").contains(text.cancelButton, { matchCase: false }))
    expect(cy.get("button").contains(text.restartButton, { matchCase: false }))
    expect(cy.get("button").contains(text.startButton, { matchCase: false }))
  })

  it('Just close popup', () => {
    cy.get("button").contains(text.cancelButton, { matchCase: false }).click()
    cy.contains(text.cancelButton, {matchCase: false}).should("not.exist")
    cy.contains(body[0].names).should("exist")
  })

  it('Restart app by reloading window', () => {
    cy.get("button").contains(text.restartButton, { matchCase: false }).click()
    expect(cy.contains(text.chooseRoom))
  })


  it('Start register mode', () => {
    cy.intercept("GET", "/examgroups/4000/scannedcards/1000", {
      statusCode: 200,
      body: {
        returnCode: 400,
        returnText: "xxx"
      },
    }).as("getProfStartCard")


    cy.get("button").contains(text.startButton, { matchCase: false }).click()
    cy.wait("@postProfStartCard")
    cy.wait(4000)
    expect(cy.contains(text.registerNow))
  })

})
