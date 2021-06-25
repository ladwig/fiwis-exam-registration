import { changeColor } from "../ledAPI";

export const state = () => ({
    isThereNextExam: null,
    isExaminer: false,
    isRegisteredStudent: null, // Not used rn, maybe for displaying icons ?
    cardNumber: null,
    returnText: null,
    status: null
  }
)

export const mutations = {

  setCardNumber(state, cardNumber) {
    state.cardNumber =  cardNumber
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
    state.returnText = returnText
  },

  setStatus(state, status) {
    state.status = status
  }
}

export const actions = {
  // Resets all states which connected to specific user/card
  resetStates(context) {
    setTimeout(() => {
      context.commit("setCardIsLoading", false , {root: true})
      context.commit("setReturnText")
      context.commit("setIsRegisteredStudent")
      context.commit("setIsThereNextExam")
      changeColor("#ffffff")
      context.commit("setStatus", null)
    }, 4000);
  },

  //Maybe to run different LED colors
  returnDecision(context, decision) {
    if(decision) {
      context.commit("setStatus", "#00ff00")
      changeColor("#00ff00")
    }
    else {
      context.commit("setStatus", "#ff0000")
      changeColor("#ff0000")
    }
  },

  checkCard(context, cardnumber) {
    // If no exam (+-1h) found -> Students can check there next exam
    if (!context.rootState.modeExamInProgress){
      context.dispatch("checkCardForNextExam", cardnumber)
    }
    // If exam is in progress right now +-1h
    else {
      console.log(cardnumber)
      context.dispatch("checkCardForThisExam", cardnumber)
    }
  },

  //Gets called when there is no exam atm and card gets scanned
  checkCardForNextExam(context, cardnumber) {
    this.$axios.get('', {
      params: {
        cardnumber: cardnumber //36104139103212548
      },
      headers: {
     //   "Accept": process.env.NEXT_EXAM_ACCEPT_HEADER
      }
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

  checkCardForThisExam(context, cardnumber) {
      const body = {
        idcardnumber: cardnumber,
        room: context.rootState.roomName,
      }
   this.$axios.post(`${context.rootState.exam.examID}/scannedcards`, body, {
      headers: {
       // "Content-Type": process.env.SCANNED_CARD_CONTENT_TYPE_HEADER
      }
    })
      .then((response) => {
        const resURL = response.headers.location
        console.log(response.headers)
        this.$axios.get(resURL, {
          headers: {
          //  "Accept": process.env.SCANNED_CARD_ACCEPT_HEADER
          }
        })
          .then((response) => {
            context.dispatch("processCardForThisExam", [response.data,cardnumber])
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

  processCardForThisExam(context, [data, cardnumber]) {
    console.log(data)
    return new Promise( resolve => {
        if(data.returnText) {
          context.commit("setReturnText", data.returnText)
        } else {
          context.commit("setReturnText", "Fehler: Kein returnText verfübar")
        }
        if([300, 500, 600].indexOf(data.returnCode) >= 0) {
          context.dispatch("returnDecision", true)
        }
        else {
          context.dispatch("returnDecision", false)
        }

        if (data.returnCode === 300) {
          context.commit("setCardNumber", cardnumber) //evtl [cardnumber]
          context.commit("setIsExaminer", true)
        }
        else if (data.returnCode === 500) {
          context.commit("setIsRegisteredStudent")
        }

      resolve()
    })
  },

  requestModeChange(context, action) {
    let body = null
    alert("ok")
      if(action === "start") {
        body = {
          idcardnumber: context.state.cardNumber, //33
          room: context.rootState.roomName,
          parameter: 1,
        }
      }
    else if(action === "stop") {
      body = {
        idcardnumber: 33,  // change to !!!! -> context.state.cardNumber
        room: context.rootState.roomName,
        parameter: 1, //stop code? 2?
      }
    }
    this.$axios.post(`${context.rootState.exam.examID}/scannedcards`, body, {
      headers: {
        // "Content-Type": process.env.SCANNED_CARD_CONTENT_TYPE_HEADER
      }
    })
      .then((response) => {
        const resURL = response.headers.location
        console.log(response.headers)
        this.$axios.get(resURL, {
          headers: {
            //  "Accept": process.env.SCANNED_CARD_ACCEPT_HEADER
          }
        })
          .then((response) => {
            context.dispatch("processModeChange", response.data)
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

  processModeChange(context, data) {
    context.commit("setCardNumber", null)
    if(data.returnCode == 400) {
      context.commit("setModeExamRegister", true, {root: true})
    }
    else if(data.returnCode == 800) {
      context.commit("setModeExamRegister", false, {root: true})
    }
  },
}
