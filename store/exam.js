export const state = () => ({
  examID: null,
  examName: null,
  startTime: null, // "2021-04-02T20:00:00+02:00"
  stopTime: null,
  examRooms: null, // "H.1.2, H.1.3"
  numberOfParticipants: null,
  examDuration: null,
  moreInformationMsg: null,
  timeBeforeAfterExam: 3600000, //1h before, 1h after exam -> modeExamInProgress
})

export const mutations = {
  setExamDuration(state) {
    const diff = ((new Date(state.startTime).getTime() - new Date(state.stopTime).getTime()) / 1000) / 60;
    state.examDuration = Math.abs(Math.round(diff));
  },

  setExamID(state, examID) {
    state.examID = examID;
  },

  setExamName(state, examName) {
    state.examName = examName;
  },

  setStartTime(state, startTime) {
    state.startTime = startTime;
  },

  setStopTime(state, stopTime) {
    state.stopTime = stopTime;
  },

  setNumberOfParticipants(state, numberOfParticipants) {
    state.numberOfParticipants = numberOfParticipants;
  },

  setExamRooms(state, examRooms) {
    state.examRooms = examRooms;
  },

}

export const getters = {
  getStartTimeWithDate(state) {
    const time = new Date(state.startTime).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    return time
  },
  getStopTimeWithoutDate(state) {
    const time = new Date(state.stopTime)
    return time.toLocaleTimeString('de-DE', {
      hour: 'numeric',
      minute: 'numeric',

    })
  },
  getStartTimeWithoutDate(state) {
    const time = new Date(state.startTime)
    return time.toLocaleTimeString('de-DE', {
      hour: 'numeric',
      minute: 'numeric',

    })
  },
}

export const actions = {
  async checkRoomForExam(context) {
    try {
    const exam = (
      await this.$axios.get('', {
        params: {
          room: context.rootState.roomName
        }
      })
    ).data;

    if (exam.length > 0) {
      const e = exam[0]
      context.commit("setExamID", e.id)
      context.commit("setExamName", e.names)
      context.commit("setStartTime", e.startTime)
      context.commit("setStopTime", e.stopTime)
      context.commit("setExamRooms", e.roomNames)
      context.commit("setNumberOfParticipants", e.totalNumberOfParticipants)
      context.commit("setExamDuration")
      console.log("Checking for exam in room " + context.rootState.roomName)
      const now = new Date();

      if (now.getTime() >= (new Date(context.state.startTime).getTime() - context.state.timeBeforeAfterExam) && now.getTime() <= (new Date(context.state.stopTime).getTime()) + context.state.timeBeforeAfterExam) {
        context.commit("setModeExamInProgress", true, {root: true})
      }
      else
       {
        context.commit("setModeExamInProgress", false, {root: true})
      }
    }
    } catch(err) {
      if (err.response) {
        context.commit("setErrorMessage", [true, 1, err.response], {root: true})
        console.error(err.response)
      } else if (err.request) {
        context.commit("setErrorMessage", [true, 0], {root: true})
        console.error("Can't get a response, maybe the connection to the API failed!")
        console.log(context.rootState.errorMessage)
      } else {
        console.error(err.message);
      }
    }
  },

  async checkCardForExam(context, cardnumber) {
    try {
      const response = (
        await this.$axios.get('', {
          params: {
            cardnumber: cardnumber
          },
        })
      ).data;
      context.commit("setCardNumber", cardnumber, {root: true})
      if (response.length > 0) {
        context.commit("setIsThereNextExam", true, {root: true})
        const e = response[0]
        context.commit("setExamName", e.names)
        context.commit("setStartTime", e.startTime)
        context.commit("setStopTime", e.stopTime)
        context.commit("setExamRooms", e.roomNames)
      } else {
        context.commit("setIsThereNextExam", false, {root: true})
      }
    } catch(err) {
      if (err.response) {
        console.error(err.response)
      } else if (err.request) {
        context.commit("setErrorMessage", [true, 0], {root: true})
        console.error("Can't get a response, maybe the connection to the API failed!")
        console.log(context.rootState.errorMessage)
      } else {
        console.error(err.message);
      }
    }
  },

  //Check or register a studentcard
  checkRegistForExam(context, [cardnumber, startModeExamRegister]) {
    let body = null
    if(startModeExamRegister) {
      body = {
        idcardnumber: cardnumber,
        room: context.rootState.roomName,
        parameter: 1,
      }
    }
    else {
       body = {
        idcardnumber: cardnumber,
        room: context.rootState.roomName,
      }
    }
    this.$axios.post(`${context.state.examID}/scannedcards`, body, {
      headers: {
       // "Content-Type": "application/vnd.fhws-scannedcard.scannedcardview+json"
      }
    })
      .then((response) => {
        const resURL = response.headers.location
        this.$axios.get(resURL, {})
          .then((response) => {
            const data = response.data

            if (data.returnCode === 300) {
              context.commit("setIsExaminer", true, {root: true})
            }
            else if (data.returnCode === 100) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }

           /*
           //Der angegebene Raum ist für diese Prüfung nicht vorgesehen.
           else if (data.returnCode === 100) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }
            //Die angegebene FHWS Karte ist nicht bekannt bzw. der Studierende ist für diese Prüfung nicht angemeldet.
            else if (data.returnCode === 200) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }
            //Bitte die Kartennummer noch einmal senden mit Parameter == 1, wenn die Registrierung wirklich geöffnet werden soll.
            else if (data.returnCode === 300) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }
            //Der Studierende ist für diese Prüfung angemeldet und steht vor einem gültigen Prüfungsraum. ODER Der Studierende ist für diese Prüfung angemeldet und hat einen Platz in Raum
            else if (data.returnCode === 500) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }
            //Der Studierende ist jetzt für diese Prüfung in diesem Raum verbindlich registriert.
            else if (data.returnCode === 600) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }
            //Angemeldet, aber die Registrierung war aber nicht erfolgreich, weil dies der falsche Raum ist. Bitte in einen Platz in Raum
            else if (data.returnCode === 700) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }

            */
            else {
              context.commit("setIsRegisteredStudent", false, {root: true})  //To remove clipping "Angemeldet / nicht angemeldet" in CurrentExamInfo
            }
            console.log("return code: " + response.data.returnCode)
          })
      })
      .catch(err => {
        if(err.response) {
          console.error(err.response)
        }
        else if(err.request) {
          context.commit("setErrorMessage", [true, 0], {root: true})
          console.error("Can't get a response, maybe the connection to the API failed!")
          console.log(context.rootState.errorMessage)
        }
        else {
          console.error(err.message);
        }
      })
  }
}
