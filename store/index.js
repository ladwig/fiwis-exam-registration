export const state = () => ({
    date: null,
    roomName: null,
    checkMode: true,
    examInProgress: false,
    isThereNextExam: true,
    cardNumber: null,
  }
)

export const mutations = {
  setRoomName(state, roomName) {
    state.roomName = roomName;
  },

  toggleExamInProgress(state, examInProgress) {
    state.examInProgress = !state.examInProgress
  },

  toggleNextExam(state, isThereNextExam) {
    state.isThereNextExam = !state.isThereNextExam
  }
}
