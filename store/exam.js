export const state = () => ({
  id: null,
  examName: "Grundlagen der Wirtschaftswissenschaften",
  startTime: "2021-04-02T20:00:00+02:00",
  stopTime: "2021-04-02T21:50:00+02:00",
  rooms: "H.1.2, H.1.3",
  numberOfParticipants: 80,
  duration: null,
})

export const mutations = {}

export const getters = {
  getStartTimeWithDate(state) {
    const time = new Date(state.startTime).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    return time
  },
  getStopTimeWithoutDate(state) {
    const time = new Date(state.stopTime)
    return time.toLocaleTimeString('de-DE', {
      hour: 'numeric',
      minute: 'numeric',

    })
  },
  getStartTimeWithoutDate(state) {
    const time = new Date(state.startTime)
    return time.toLocaleTimeString('de-DE', {
      hour: 'numeric',
      minute: 'numeric',

    })
  },
}
