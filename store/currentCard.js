/* Saves and processes all relevant data for the currently scanned card.
Also handles the majority of GET and POST requests to the FIWIS API. */
import { changeLEDColor } from "../ledAPI";

export const state = () => ({
    isThereNextExam: null,
    isExaminer: false,
    cardNumber: null,
    returnText: null,
    status: null,
  }
)

export const mutations = {

  setCardNumber(state, cardNumber) {
    state.cardNumber =  cardNumber
  },

  setIsExaminer(state, isExaminer) {
    state.isExaminer = isExaminer
  },

  setIsThereNextExam(state, isThereNextExam) {
    state.isThereNextExam = isThereNextExam
  },

  setReturnText(state, returnText) {
    state.returnText = returnText
  },

  setStatus(state, status) {
    state.status = status
  },
}

export const actions = {
  //Resets all states that are connected to specific user/card
  resetStates(context, timeout) {

   setTimeout( () => {
        context.commit("setInfoDialogStatus", false, {root: true})
      }, timeout)

   setTimeout(() => {
      context.commit("setCardIsLoading", false , {root: true})
      context.commit("setReturnText", null)
      context.commit("setIsThereNextExam", null)
      changeLEDColor("#ffffff")
      context.commit("setStatus", null)
      context.commit("setCardNumber", null)
    }, timeout+400)
  },

  async checkCard(context, cardnumber) {

      const cardID = await context.dispatch("cardNum2String", cardnumber.toString())
      // If no exam (+-1h) found -> Students can check there next exam
      if (!context.rootState.modeExamInProgress){
        context.dispatch("checkCardForNextExam", cardID)
      }
      // If exam is in progress right now +-1h
      else {
        context.dispatch("checkCardForThisExam", cardID)
      }
  },

  // Retrieves the next exam for the scanned card
  checkCardForNextExam(context, cardnumber) {
    this.$axios.get('', {
      params: {
        cardnumber:  cardnumber,
      },
      headers: {
        "Accept": process.env.NEXT_EXAM_ACCEPT_HEADER
      }
    })
      .then((response)  => {
        context.dispatch("processCardForNextExam", response.data)
          .then(() => {
              context.dispatch("resetStates", context.rootState.infoDialogDisplayTime)
            }
          )
      })
      .catch(err => {
          context.commit("setErrorMessage", err, {root: true})
      })
  },

  // Called by checkCardForNextExam() and sets the queried values
  processCardForNextExam(context, data) {
    return new Promise( resolve => {
      if (data.length > 0) {
        context.commit("setIsThereNextExam", true)
        const e = data[0]
        context.commit("exam/setExamName", e.names, {root: true})
        context.commit("exam/setStartTime", e.startTime, {root: true})
        context.commit("exam/setStopTime", e.stopTime, {root: true})
        context.commit("exam/setExamRooms", e.roomNames, {root: true})
        context.dispatch("returnDecision", true)
      } else {
        context.commit("setIsThereNextExam", false)
        context.dispatch("returnDecision", false)
      }
      resolve()
    })
  },

  /* Queries whether the scanned card is registered for the current exam
  or checks the student in for the exam if the registration mode is active */
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

        this.$axios.get(resURL, {
          headers: {
            "Accept": process.env.SCANNED_CARD_ACCEPT_HEADER
          }
        })
          .then((res) => {
            context.dispatch("processCardForThisExam", [res.data,cardnumber])
              .then(() => {
                  context.dispatch("resetStates", context.rootState.infoDialogDisplayTime)
                  context.dispatch("exam/updateNumberOfStudentsInRoom", '',{root: true})
                }
              )
          })
      })
      .catch(err => {
        context.commit("setErrorMessage", err, {root: true})
      })
  },

 /* Processes the return values of checkCardForThisExam().
 The returnCodes 300 (opens admin menu) and 800 (disables register mode) are handled separately. */
  processCardForThisExam(context, [data, cardnumber]) {
    return new Promise( resolve => {
      if(data.returnText && data.returnCode !== 300) {
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
          context.commit("setCardNumber", cardnumber)
          context.commit("setIsExaminer", true)
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

  // Gets executed through the start registration button in the admin menu
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

        this.$axios.get(resURL, {
          headers: {
            "Accept": process.env.SCANNED_CARD_ACCEPT_HEADER
          }
        })
          .then((res) => {
            context.dispatch("processModeChange", res.data)
          })
      })
      .catch(err => {
        context.commit("setErrorMessage", err, {root: true})
      })
  },

  // Called by startModeExamRegister()
  processModeChange(context, data) {
    if(data.returnCode === 400) {
      context.commit("setModeExamRegister", true, {root: true})
    }
  },

  //HelperFunction: To run different LED on the device and in the UI
  returnDecision(context, decision) {
    if(decision) {
      context.commit("setStatus", "#00ff00")
      changeLEDColor("#00ff00")
    }
    else {
      context.commit("setStatus", "#ff0000")
      changeLEDColor("#ff0000")
    }
    context.commit("setInfoDialogStatus", true, {root: true})
  },

  //HelperFunction: Converting the scanned card to a matchable string for FIWIS
  cardNum2String(context, cardnumber) {
    try {
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
    } catch (err) {
      context.commit("setErrorMessage", err, {root: true})
    }
  },
}
