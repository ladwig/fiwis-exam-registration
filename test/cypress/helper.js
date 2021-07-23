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

  studentCardIDRaw: "0477591a1f5b80",
  studentCardIDConvert: "36128986163148548",

  notStudentCardIDRaw: "0177591a1f5b10",
  notStudentCardIDConvert: "4603788771555073",

  profCardIDRaw: "0577591a1f5b00",
  profCardIDConvert: "100189144184581",

  nextExamTitle: "Wirtschaft",
  nextExamRoom: "VCC",
  noDisturb: "nicht stören",

  noNextExam:  "keine weitere Prüfung angemeldet",

  startButton: "registierung",
  cancelButton: "abbrechen",
  restartButton: "neu starten",
  okayButton: "okay",

  registerNow: "Anwesenheit bestätigen",
  checkRegist: "Anmeldung prüfen",
  noExam: "keine Prüfung",
  nextExam: "nächste Prüfung",

  popupHeadline: "einstellungen",

  error: "fehler",

  StudentCardIsRegist: "Student ist zur Prüfung angemeldet",
  StudentCardIsRegistCode: 500,

  StudentCardIsNotRegist: "Student ist nicht zur Prüfung angemeldet",
  StudentCardIsNotRegistCode: 200,

  StudentCardIsCheckedIn: "Student erfolgreich bestätigt",
  StudentCardIsCheckedInCode: 600,

  StudentCardIsNotCheckedIn: "Student kann nicht bestätigt werden",
  StudentCardIsNotCheckedInCode: 200,
}


export const reuseFunctions = {
  setTimeDate() {
    cy.clock(new Date(2020, 6, 24, 20, 10, 0), ['Date'])
  },

  chooseRoomInterception(emptybody) {
    let data = body
    if(emptybody) {
      data = []
    }
    cy.intercept("GET", "/examgroups?room=H.1.1", {
      statusCode: 200,
      headers: {
        "content-type": "application/vnd.fhws-examgroup.examroomdisplayview+json"
      },
      body: data,
    })
    cy.visit('/')
    cy.contains(body[0].roomNames).click()
  },

  scanAdminCard() {
    cy.get("input").type(text.profCardIDRaw)
  },

  scanAStudentCard() {
    cy.get("input").type(text.studentCardIDRaw)
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
  },

  updateNumberOfStudentsInRoomInRoomInterception() {
    cy.intercept("GET", "/examgroups/4000/examrooms", {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-scannedcard.scannedcardview+json',
      },
      body: [
        {
          roomName: "H.1.2",
          numberOfStudentsPlannedInRoom: 1000,
          numberOfStudentsPresentInRoom: 10
        },
        {
          roomName: "H.1.1",
          numberOfStudentsPlannedInRoom: 20,
          numberOfStudentsPresentInRoom: 10
        }
      ]
    }).as("updateStudentsInRoom")
  },

  //postProfCardInterception
  postScannedCardInterception() {
    let examRegistMode = false

    cy.intercept("POST", '/examgroups/4000/scannedcards', (req) => {

      if(req.body.idcardnumber == text.profCardIDConvert && !req.body.parameter) {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/6000"
          }
        })
        req.alias = "postProfCard"
      }

      else if(req.body.parameter == 1) {
        examRegistMode = true
        req.reply({
          headers: {
            "location": "/4000/scannedcards/1000",
            "accept": 'application/vnd.fhws-scannedcard.scannedcardview+json'
          }
        })
        req.alias = "postProfCardStartExam"
      }

      else if(req.body.idcardnumber == text.studentCardIDConvert && !examRegistMode) {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/8000",
            "accept": 'application/vnd.fhws-scannedcard.scannedcardview+json'
          }
        })
        req.alias = "postStudentCardIsRegist"
      }

      else if(req.body.idcardnumber == text.notStudentCardIDConvert && !examRegistMode) {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/8100",
            "accept": 'application/vnd.fhws-scannedcard.scannedcardview+json'
          }
        })
        req.alias = "postStudentCardIsNotRegist"
      }

      else if(req.body.idcardnumber == text.studentCardIDConvert && examRegistMode) {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/3000",
            "accept": 'application/vnd.fhws-scannedcard.scannedcardview+json'
          }
        })
        req.alias = "postStudentCardIsCheckedIn"
      }

      else if(req.body.idcardnumber == text.notStudentCardIDConvert && examRegistMode) {
        req.reply({
          headers: {
            "location": "/4000/scannedcards/3100",
            "accept": 'application/vnd.fhws-scannedcard.scannedcardview+json'
          }
        })
        req.alias = "postStudentCardIsNotCheckedIn"
      }

    })
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

  getStudentCardIsRegistInterception () {
    cy.intercept("GET", "/examgroups/4000/scannedcards/8000", {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-scannedcard.scannedcardview+json',
      },
      body: {
        returnCode: text.StudentCardIsRegistCode,
        returnText: text.StudentCardIsRegist
      },
    }).as("getStudentCardIsRegist")
  },

  getStudentCardNotRegistInterception () {
    cy.intercept("GET", "/examgroups/4000/scannedcards/8100", {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-scannedcard.scannedcardview+json',
      },
      body: {
        returnCode: text.StudentCardIsNotRegistCode,
        returnText: text.StudentCardIsNotRegist
      },
    }).as("getStudentCardNotRegist")
  },

  getStudentCardIsCheckedInInterception () {
    cy.intercept("GET", "/examgroups/4000/scannedcards/3000", {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-scannedcard.scannedcardview+json',
      },
      body: {
        returnCode: text.StudentCardIsCheckedInCode,
        returnText: text.StudentCardIsCheckedIn
      },
    }).as("getStudentCardIsCheckedIn")
  },

  getStudentCardIsNotCheckedInInterception () {
    cy.intercept("GET", "/examgroups/4000/scannedcards/3100", {
      statusCode: 200,
      headers: {
        'content-type': 'application/vnd.fhws-scannedcard.scannedcardview+json',
      },
      body: {
        returnCode: text.StudentCardIsNotCheckedInCode,
        returnText: text.StudentCardIsNotCheckedIn
      },
    }).as("getStudentCardIsNotCheckedIn")
  },

}
