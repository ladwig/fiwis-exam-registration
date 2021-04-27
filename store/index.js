export const state = () => ({
    roomName: null,
    modeJustCheck: true, // Keine Prüfung
    modeExamInProgress: null, // Prüfungszeit + 1h vorher +1h nachher
    modeExamRegister: false,
    isThereNextExam: false,
    isExaminer: false, // Prüfer, der Registrierung starten kann
    isRegisteredStudent: null,
    attendanceConfirmed: false,
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

  setModeExamInProgress(state, modeExamInProgress) {
    state.modeExamInProgress = modeExamInProgress
  },

  setIsExaminer(state, isExaminer) {
    state.isExaminer = isExaminer
  },

  setIsRegisteredStudent(state, isRegisteredStudent) {
    state.isRegisteredStudent = isRegisteredStudent
  },

  setCardIsLoading(state, cardIsLoading) {
    state.cardIsLoading = cardIsLoading
  },

  setIsThereNextExam(state, isThereNextExam) {
    state.isThereNextExam = isThereNextExam
  },

  setModeExamRegister(state, modeExamRegister) {
    state.modeExamRegister = modeExamRegister
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

