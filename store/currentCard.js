export const state = () => ({
    isThereNextExam: null,
    isExaminer: false,
    isRegisteredStudent: null, // Not used rn, maybe for displaying icons ?
    cardNumber: null,
    returnText: null,
  }
)

export const mutations = {

  setCardNumber(state, cardNumber) {
    state.cardNumber =  parseInt(cardNumber, 16)
  },

  setIsExaminer(state, isExaminer) {
    state.isExaminer = isExaminer
  },

  setIsRegisteredStudent(state, isRegisteredStudent) {
    state.isRegisteredStudent = isRegisteredStudent
  },

  setIsThereNextExam(state, isThereNextExam) {
    state.isThereNextExam = isThereNextExam
  },

  setReturnText(state, returnText) {
    state.returnText = returnText;
  },
}

export const actions = {

  //Resets all states which connected to specific user/card12
  resetStates(context) {
    setTimeout(() => {
      context.commit("setCardNumber", null)
      context.commit("setCardIsLoading", false , {root: true})
      context.commit("setReturnText")
      context.commit("setIsRegisteredStudent")
      context.commit("setIsThereNextExam")
    }, 4000);
  },

  //Gets called when there is no exam atm and card gets scanned
  checkCardForNextExam(context, cardnumber) {
    this.$axios.get('', {
      params: {
        cardnumber:  parseInt(cardnumber, 16)
      },
    })
      .then((response)  => {
        context.dispatch("processCardForNextExam", response.data)
          .then(() => {
              context.dispatch("resetStates")
            }
          )
      })
      .catch(err => {
        if(err.response) {
          console.error(err.response)
        }
        else if(err.request) {
          context.commit("setErrorMessage", [true, 0], {root: true})
          console.error("Can't get a response, maybe the connection to the API failed!")
        }
        else {
          console.error(err.message);
        }
      })
  },

  processCardForNextExam(context, data) {
    console.log(data)
    return new Promise( resolve => {
      if (data.length > 0) {
        context.commit("setIsThereNextExam", true)
        const e = data[0]
        context.commit("exam/setExamName", e.names, {root: true})
        context.commit("exam/setStartTime", e.startTime, {root: true})
        context.commit("exam/setStopTime", e.stopTime, {root: true})
        context.commit("exam/setExamRooms", e.roomNames, {root: true})
      } else {
        context.commit("setIsThereNextExam", false)
      }
      resolve()
    })
  },

  checkCardForThisExam(context, [cardnumber, startModeExamRegister]) {
    let body = null

    //To check if card is admin/examiner and if ModeExamRegister should start
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

    this.$axios.post(`${context.rootState.exam.examID}/scannedcards`, body, {
      headers: {
        // "Content-Type": "application/vnd.fhws-scannedcard.scannedcardview+json"
      }
    })
      .then((response) => {
        const resURL = response.headers.location
        this.$axios.get(resURL, {})
          .then((response) => {
            context.dispatch("processCardForThisExam", response.data)
              .then(() => {
                context.dispatch("resetStates")
                context.dispatch("exam/updateNumberOfStudentsInRoom", '',{root: true})
                }
              )
          })
      })
      .catch(err => {
        if(err.response) {
          console.error(err.response)
        }
        else if(err.request) {
          context.commit("setErrorMessage", [true, 0], {root: true})
          console.error("Can't get a response, maybe the connection to the API failed!")
        }
        else {
          console.error(err.message);
        }
      })
  },

  processCardForThisExam(context, data) {
    return new Promise( resolve => {
      if(data.returnText) {
        context.commit("setReturnText", data.returnText)
      } else {
        context.commit("setReturnText", "Kein returnText verfübar")
      }

      if (data.returnCode === 300) {
        context.commit("setIsExaminer", true)
      }
      else if (data.returnCode === 500) {
        context.commit("setIsRegisteredStudent")
      }
      resolve()
    })
  },

}
