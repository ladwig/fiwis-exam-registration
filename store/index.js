// Saves and processes all general application-related data and the different modes.
export const state = () => ({
    roomName: null,
    modeJustCheck: true, // No exam found
    modeExamInProgress: null, // Exam time + X time before and after -> X = exam/timeBeforeAfterExam
    attentionSign: false,
    modeExamRegister: false,
    errorMessage: null,
    cardIsLoading: false, // True when API calls are made
    infoDialogStatus: false,
    infoDialogDisplayTime: 4000
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

  setErrorMessage(state, msg) {
    state.errorMessage = msg
  },

  setAttentionSign(state, attentionSign) {
    state.attentionSign = attentionSign
  },

  setCardIsLoading(state, cardIsLoading) {
    state.cardIsLoading = cardIsLoading;
  },

  setInfoDialogStatus(state, infoDialogStatus) {
    state.infoDialogStatus = infoDialogStatus
  }

}


