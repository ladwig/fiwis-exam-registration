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
  // Resets all states that are connected to specific user/card
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

  async checkCard(context, cardnumber) {
    if(cardnumber != null) {
      const cardID = await context.dispatch("cardNum2String", cardnumber)
      // If no exam (+-1h) found -> Students can check there next exam
      if (!context.rootState.modeExamInProgress){
        context.dispatch("checkCardForNextExam", cardID)
      }
      // If exam is in progress right now +-1h
      else {
        context.dispatch("checkCardForThisExam", cardID)
      }
    }
    else {
      console.error("No input")
    }
  },

  //Gets called when there is no exam atm and card gets scanned
  checkCardForNextExam(context, cardnumber) {
    this.$axios.get('', {
      params: {
        cardnumber: "36104139103212548", //cardnumber
      },
      headers: {
        "Accept": process.env.NEXT_EXAM_ACCEPT_HEADER
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
          context.commit("setErrorMessage", err, {root: true})
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
        "Content-Type": process.env.SCANNED_CARD_CONTENT_TYPE_HEADER
      }
    })
      .then((response) => {
        const resURL = response.headers.location
        console.log(response.headers)
        this.$axios.get(resURL, {
          headers: {
            "Accept": process.env.SCANNED_CARD_ACCEPT_HEADER
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
        context.commit("setErrorMessage", err, {root: true})
      })
  },

  processCardForThisExam(context, [data, cardnumber]) {
    return new Promise( resolve => {
      if(data.returnText && data.returnCode != 300) {
        context.commit("setReturnText", data.returnText)
      }
      if([300, 500, 600, 800].indexOf(data.returnCode) >= 0) {
        context.dispatch("returnDecision", true)
      }
      else {
        context.dispatch("returnDecision", false)
      }

      switch (data.returnCode) {
        case 300:
          context.commit("setCardNumber", cardnumber) //evtl [cardnumber]
          context.commit("setIsExaminer", true)
          break
        case 500:
          context.commit("setIsRegisteredStudent")
          break
        case 800:
          context.commit("setModeExamRegister", false, {root: true})
          break
        default:
          break
      }
      resolve()
    })
  },

  startModeExamRegister(context) {
     const body = {
       idcardnumber: context.state.cardNumber,
       room: context.rootState.roomName,
       parameter: 1
     }

    this.$axios.post(`${context.rootState.exam.examID}/scannedcards`, body, {
      headers: {
          "Content-Type": process.env.SCANNED_CARD_CONTENT_TYPE_HEADER
      }
    })
      .then((response) => {
        const resURL = response.headers.location
        console.log(response.headers)
        this.$axios.get(resURL, {
          headers: {
            "Accept": process.env.SCANNED_CARD_ACCEPT_HEADER
          }
        })
          .then((response) => {
            context.dispatch("processModeChange", response.data)
          })
      })
      .catch(err => {
        context.commit("setErrorMessage", err, {root: true})
      })
  },

  processModeChange(context, data) {
    context.commit("setCardNumber", null)
    if(data.returnCode == 400) {
      context.commit("setModeExamRegister", true, {root: true})
    }
  },

  //HelperFunction: To run different LED on the device and in the UI
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

  //HelperFunction: Converting the scanned card to a matchable string for FIWIS
  cardNum2String(context, cardnumber) {
    const converter = require('hex2dec');
    return String(
      converter.hexToDec(
        cardnumber
          .match(/.{1,2}/g)
          .reverse()
          .join(""),
        16
      )
    )
  },
}
