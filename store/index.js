export const state = () => ({
    roomName: null,
    modeJustCheck: true, // No exam found
    modeExamInProgress: null, // Exam time + X time before and after -> X = exam/timeBeforeAfterExam
    modeExamRegister: false, // Registermode active
    errorMessage: {
      error: false,
      msgNmbr: null,
      response: null
    },
    cardIsLoading: false // True when API calls are made and returns displayed
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
