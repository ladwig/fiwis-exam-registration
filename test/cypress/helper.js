export const body = [ {
  id: 4000,
  names: "Technischer Datenschutz",
  roomNames: "H.1.1",
  totalNumberOfParticipants: 50,
  startTime: new Date(2020, 6, 24, 20, 0, 0),
  stopTime: new Date(2020, 6, 24, 21, 0, 0),
  examroomUrl: {
    href: "/4000/examrooms"
  }
}]

export const text = {
  chooseRoom: "einen Raum",
  isRegistered: "Der Student ist zur Prüfung angemeldet",
  isRegisteredCode: 500,
  isNotRegistered: "Der Student ist nicht Prüfung angemeldet",
  isNotRegisteredCode: 200,
  nextExamTitle: "Wirtschaft- und IT-Recht",
  nextExamRoom: "VCC",
  noNextExam:  "Keine weitere Prüfung gefunden",
  startButton: "registierung",
  registerNow: "Anwesenheit bestätigen",
  popupHeadline: "einstellungen",
  cancelButton: "abbrechen",
  restartButton: "neu starten",
  checkRegist: "Anmeldung prüfen",
  noDisturb: "nicht stören",
  noExam: "keine Prüfung",
  nextExam: "nächste Prüfung",
  okayButton: "okay",
  error: "fehler",
}


export const reuseFunctions = {
  setTimeDate() {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])
  },

  chooseRoomInterception() {
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      body: body,
    })
    cy.visit('/')
    cy.contains(body[0].roomNames).click()
  },

  scanAdminCard() {
    cy.get("input").type("13")
  },

  getProfCardInterception() {
    cy.intercept("GET", "/examgroups/4000/scannedcards/6000", {
      statusCode: 200,
      body: {
        returnCode: 300,
        returnText: "Prof"
      },
    }).as("getProfCard")
  },

  getProfCardStartExamInterception() {
    cy.intercept("GET", "/examgroups/4000/scannedcards/1000", {
      statusCode: 200,
      body: {
        returnCode: 400,
        returnText: "xxx"
      },
    }).as("getProfCardStartExam")
  },

  postProfCardInterception() {
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
        req.alias = "postProfCardStartExam"
      }
    })
    cy.wait("@postProfCard")
  },

  getExamRegistrationStateInterception() {
    cy.intercept("GET", "/examgroups/4000/examrooms", {
      statusCode: 200,
      body: [
        {
          roomName: "H.1.2",
          examRegistrationState: 1
        },
        {
          roomName: "H.1.1",
          examRegistrationState: 0
        }
      ]
    })
  }
}
