export const state = () => ({
    date: null,
    roomName: null,
    checkMode: true,
    examInProgress: false,
    cardNumber: null,
  }
)

export const mutations = {
  setRoomName(state, roomName) {
    state.roomName = roomName;
  },


  toggle(state, examInProgress) {
    state.examInProgress = !state.examInProgress
  }
}
