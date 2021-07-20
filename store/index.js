export const state = () => ({
    roomName: null,
    modeJustCheck: true, // No exam found
    modeExamInProgress: null, // Exam time + X time before and after -> X = exam/timeBeforeAfterExam
    attentionSign: false,
    modeExamRegister: false,
    errorMessage: null,
    cardIsLoading: false // True when API calls are made
  }
)

/* eslint no-shadow: ["error", { "allow": ["state"] }]*/

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

  setCardIsLoading(state, cardIsLoading) {
    state.cardIsLoading = cardIsLoading;
  },

  setAttentionSign(state, attentionSign) {
    state.attentionSign = attentionSign;
  },
}


