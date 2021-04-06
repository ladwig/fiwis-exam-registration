export const state = () => ({
  date: null,
  roomName: null,
  checkMode: true,
  noExam: true,
  cardNumber: null,
})

export const mutations = {
  setRoomName(state, roomName) {
    state.roomName = roomName;
  },
}
