export const state = () => ({
    roomName: null,
    modeJustCheck: true, // Keine Prüfung
    modeExamInProgress: null, // Prüfungszeit + 1h vorher +1h nachher
    modeExamRegister: false,
    isThereNextExam: true,
    isExaminer: false, // Prüfer, der Registrierung starten kann
    cardNumber: null,
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

  //For manual testing
  toggleExamInProgress(state) {
    state.modeExamInProgress = !state.modeExamInProgress
  },

  //For manual testing
  toggleNextExam(state, isThereNextExam) {
    state.isThereNextExam = !state.isThereNextExam
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

