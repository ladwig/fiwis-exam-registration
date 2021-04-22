export const state = () => ({
    roomName: null,
    modeJustCheck: true, // Keine Prüfung
    modeExamInProgress: null, // Prüfungszeit + 1h vorher +1h nachher
    modeExamRegister: false,
    isThereNextExam: false,
    isExaminer: false, // Prüfer, der Registrierung starten kann
    cardNumber: null,
    cardIsLoading: false,
  }
)

export const mutations = {
  setRoomName(state, roomName) {
    state.roomName = roomName;
  },

  setCardNumber(state, cardNumber) {
    state.cardNumber = cardNumber
  },

  setModeExamInProgressTrue(state) {
    state.modeExamInProgress = true
  },

  setModeExamInProgressFalse(state) {
    state.modeExamInProgress = false
  },

  setIsExaminer(state, isExaminer) {
    state.isExaminer = isExaminer
  },

  setCardIsLoading(state, cardIsLoading) {
    state.cardIsLoading = cardIsLoading
  },

  //For manual testing
  toggleExamInProgress(state) {
    state.modeExamInProgress = !state.modeExamInProgress
  },

  setIsThereNextExam(state, isThereNextExam) {
    state.isThereNextExam = isThereNextExam
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

