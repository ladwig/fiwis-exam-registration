export const state = () => ({
  examID: null,
  examName: null,
  startTime: null, // "2021-04-02T20:00:00+02:00"
  stopTime: null,
  examRooms: null, // "H.1.2, H.1.3"
  numberOfParticipants: null,
  numberOfStudentsPlannedInRoom: null,
  numberOfStudentsPresentInRoom: null,
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

  setNumberOfStudentsPlannedInRoom(state, numberOfStudentsPlannedInRoom) {
    state.numberOfStudentsPlannedInRoom = numberOfStudentsPlannedInRoom;
  },

  setNumberOfStudentsPresentInRoom(state, numberOfStudentsPresentInRoom) {
    state.numberOfStudentsPresentInRoom = numberOfStudentsPresentInRoom;
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

  // Get's called after room selection and at set interval. Sets all relevant exam information.
  checkRoomForExam(context) {
    this.$axios.get('', {
      params: {
        room: context.rootState.roomName
      }
    })
      .then((response) => {
        context.dispatch("processRoomForExam", response.data)
      })
      .catch(err => {
        if (err.response) {
          context.commit("setErrorMessage", [true, 1, err.response], {root: true})
          console.error(err.response)
        } else if (err.request) {
          context.commit("setErrorMessage", [true, 0], {root: true})
          console.log(context.rootState.errorMessage)
        } else {
          console.error(err.message);
        }
      })
  },

  processRoomForExam(context, data) {
    if (data.length > 0) {
      const e = data[0]
      context.commit("setExamID", e.id)
      context.commit("setExamName", e.names)
      context.commit("setStartTime", e.startTime)
      context.commit("setStopTime", e.stopTime)
      context.commit("setExamRooms", e.roomNames)
      context.commit("setNumberOfParticipants", e.totalNumberOfParticipants)
      context.commit("setExamDuration")

      const now = new Date();
      if (now.getTime() >= (new Date(context.state.startTime).getTime() - context.state.timeBeforeAfterExam) && now.getTime() <= (new Date(context.state.stopTime).getTime()) + context.state.timeBeforeAfterExam) {
        context.commit("setModeExamInProgress", true, {root: true})
      }
      else
      {
        context.commit("setModeExamInProgress", false, {root: true})
      }
    }
  },

  //Checks how many students are in the room
  async updateNumberOfStudentsInRoom(context) {
    try {
      const response = (
        await this.$axios.get(`${context.state.examID}/examrooms`, {
        })
      ).data;
      if(response.length > 0) {
        context.commit("setNumberOfStudentsPlannedInRoom", response[0].numberOfStudentsPlannedInRoom)
        context.commit("setNumberOfStudentsPresentInRoom", response[0].numberOfStudentsPresentInRoom)
      }
    } catch(err) {
      if (err.response) {
        console.error(err.response)
      } else if (err.request) {
        context.commit("setErrorMessage", [true, 0], {root: true})
        console.log(context.rootState.errorMessage)
      } else {
        console.error(err.message);
      }
    }
  },

  //Check or register a studentcard
/*  cardHandler(context, [cardnumber, startModeExamRegister]) {
    let body = null
    //To check if card is admin/examiner
    if(startModeExamRegister) {
      body = {
        idcardnumber:  parseInt(cardnumber, 16),
        room: context.rootState.roomName,
        parameter: 1,
      }
    }
    else {
       body = {
        idcardnumber:  parseInt(cardnumber, 16),
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
            console.log("return code: " + response.data.returnCode)

            const data = response.data

            if(data.returnText) {
              context.commit("setReturnText", data.returnText, {root: true})
            } else {
              context.commit("setReturnText", "Kein returnText verfübar", {root: true})
            }

            if (data.returnCode === 300) {
              context.commit("setIsExaminer", true, {root: true})
            }
            else if (data.returnCode === 500) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }

            context.dispatch("checkNumberOfStudentsInRoom")
            context.dispatch("resetStates")
            /!*
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
            *!/
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
  }*/
}
