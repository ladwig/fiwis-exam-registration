export const state = () => ({
    roomName: null,
    examInProgress: false, // Prüfungszeit und Vor-/Nachlaufzeit
    isThereNextExam: true,
    isExaminer: false, // Prüfer, der Registrierung starten kann
    cardNumber: null,
  }
)

export const mutations = {
  setRoomName(state, roomName) {
    state.roomName = roomName;
  },
  //For manual testing
  toggleExamInProgress(state, examInProgress) {
    state.examInProgress = !state.examInProgress
  },

  //For manual testing
  toggleNextExam(state, isThereNextExam) {
    state.isThereNextExam = !state.isThereNextExam
  }
}

