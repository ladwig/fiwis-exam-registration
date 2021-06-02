export const state = () => ({
    roomName: null,
    modeJustCheck: true, // Keine Prüfung
    modeExamInProgress: null, // Prüfungszeit + 1h vorher +1h nachher
    modeExamRegister: false,
    isThereNextExam: null,
    isExaminer: false, // Prüfer, der Registrierung starten kann
    isRegisteredStudent: null,
    attendanceConfirmed: false,
    cardNumber: null,
    errorMessage: {
      error: false,
      msgNmbr: null,
      response: null
    },
    returnText: null,
    cardIsLoading: false
  }
)

export const mutations = {
  setRoomName(state, roomName) {
    state.roomName = roomName;
  },

  setCardNumber(state, cardNumber) {
    state.cardNumber =  parseInt(cardNumber, 16)
  },

  setModeExamInProgress(state, modeExamInProgress) {
    state.modeExamInProgress = modeExamInProgress
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

  setModeExamRegister(state, modeExamRegister) {
    state.modeExamRegister = modeExamRegister
  },

  setErrorMessage(state, data) {
    state.errorMessage.error = data[0]
    state.errorMessage.msgNmbr = data[1]
    state.errorMessage.response = data[2]
  },

  setReturnText(state, returnText) {
    state.returnText = returnText;
  },

  setCardIsLoading(state, cardIsLoading) {
    state.cardIsLoading = cardIsLoading;
  },

  //For manual testing
  toggleExamInProgress(state) {
    state.modeExamInProgress = !state.modeExamInProgress
  },

  //For manual testing
  toogleModeExamRegister(state, modeExamRegister) {
    state.modeExamRegister = !state.modeExamRegister
  }

}

export const getters = {
  getCardNumber(state) {
    return state.cardNumber
  }
}

