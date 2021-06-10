export const state = () => ({
    isThereNextExam: false,
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
    console.log("works")
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
  async checkCardForNextExam(context, cardnumber) {
    try {
      const response = (
        await this.$axios.get('', {
          params: {
            cardnumber:  parseInt(cardnumber, 16)
          },
        })
      ).data;
      context.commit("setCardNumber", cardnumber)
      if (response.length > 0) {
        context.commit("setIsThereNextExam", true)
        const e = response[0]
        context.commit("exam/setExamName", e.names, {root: true})
        context.commit("exam/setStartTime", e.startTime, {root: true})
        context.commit("exam/setStopTime", e.stopTime, {root: true})
        context.commit("exam/setExamRooms", e.roomNames, {root: true})
      } else {
        context.commit("setIsThereNextExam", false)
      }
      context.dispatch("resetStates")
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

  checkCardForThisExam(context, [cardnumber, startModeExamRegister]) {
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

    this.$axios.post(`${context.rootState.exam.examID}/scannedcards`, body, {
      headers: {
        // "Content-Type": "application/vnd.fhws-scannedcard.scannedcardview+json"
      }
    })
      .then((response) => {
        const resURL = response.headers.location
        this.$axios.get(resURL, {})
          .then((response) => {
            context.dispatch("setCardReturnData", response.data)

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

  setCardReturnData(context, data) {
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
  }

}
