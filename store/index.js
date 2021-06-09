export const state = () => ({
    roomName: null,
    modeJustCheck: true, // Keine Prüfung
    modeExamInProgress: null, // Prüfungszeit + 1h vorher +1h nachher
    modeExamRegister: false,
   // isThereNextExam: null,
 //   isExaminer: false, // Prüfer, der Registrierung starten kann
   // isRegisteredStudent: null,
  //  cardNumber: null,
    errorMessage: {
      error: false,
      msgNmbr: null,
      response: null
    },
   // returnText: null,
    cardIsLoading: false
  }
)

export const mutations = {
  setRoomName(state, roomName) {
    state.roomName = roomName;
  },

  setModeExamInProgress(state, modeExamInProgress) {
    state.modeExamInProgress = modeExamInProgress
  },

  setModeExamRegister(state, modeExamRegister) {
    state.modeExamRegister = modeExamRegister
  },

  setErrorMessage(state, data) {
    state.errorMessage.error = data[0]
    state.errorMessage.msgNmbr = data[1]
    state.errorMessage.response = data[2]
  },

  setCardIsLoading(state, cardIsLoading) {
    state.cardIsLoading = cardIsLoading;
  },

}

export const getters = {
  getCardNumber(state) {
    return state.cardNumber
  }
}

export const actions = {

}
