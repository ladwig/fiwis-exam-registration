export const state = () => ({
  date: null,
  roomName: null,
  checkMode: true,
  noExam: true,
  cardNumber: null,

  exam: {
    id: null,
    name: null,
    startTime: null,
    endTime: null,
    rooms: null,
    numberOfParticipants: null,
    duration: null,
  },
})

export const mutations = {
  setRoomName(state, roomName) {
    state.roomName = roomName;
  },
}
