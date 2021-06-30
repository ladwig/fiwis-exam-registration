export const state = () => ({
  examID: null,
  examName: null,
  startTime: null, // "2021-04-02T20:00:00+02:00"
  stopTime: null,
  examRooms: null, // "H.1.2, H.1.3"
  numberOfParticipants: null,
  numberOfStudentsPlannedInRoom: null,
  numberOfStudentsPresentInRoom: null,
  examDuration: null,
  moreInformationMsg: null,
  timeBeforeAfterExam: 3600000, //1h before, 1h after exam -> modeExamInProgress
})

export const mutations = {
  setExamDuration(state) {
    const diff = ((new Date(state.startTime).getTime() - new Date(state.stopTime).getTime()) / 1000) / 60;
    state.examDuration = Math.abs(Math.round(diff));
  },

  setExamID(state, examID) {
    state.examID = examID;
  },

  setExamName(state, examName) {
    state.examName = examName;
  },

  setStartTime(state, startTime) {
    state.startTime = startTime;
  },

  setStopTime(state, stopTime) {
    state.stopTime = stopTime;
  },

  setNumberOfParticipants(state, numberOfParticipants) {
    state.numberOfParticipants = numberOfParticipants;
  },

  setNumberOfStudentsPlannedInRoom(state, numberOfStudentsPlannedInRoom) {
    state.numberOfStudentsPlannedInRoom = numberOfStudentsPlannedInRoom;
  },

  setNumberOfStudentsPresentInRoom(state, numberOfStudentsPresentInRoom) {
    state.numberOfStudentsPresentInRoom = numberOfStudentsPresentInRoom;
  },

  setExamRooms(state, examRooms) {
    state.examRooms = examRooms;
  },
}

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

export const actions = {

  // Runs after room selection and at set interval (every minute)
  // Gets all relevant exam information, sets/commits them with it's process function
  checkRoomForExam(context) {
    this.$axios.get('', {
      params: {
        room: context.rootState.roomName
      },
      headers: {
       "Accept": process.env.EXAM_NAME_ACCEPT_HEADER
      }
    })
      .then((response) => {
        context.dispatch("processRoomForExam", response.data)
      })
      .catch(err => {
        if (err.response) {
          context.commit("setErrorMessage", [true, 1, err.response], {root: true})
          console.error(err.response)
        } else if (err.request) {
          context.commit("setErrorMessage", [true, 0], {root: true})
          console.log(context.rootState.errorMessage)
        } else {
          console.error(err.message);
        }
      })
  },

  processRoomForExam(context, data) {
    if (data.length > 0) {
      const e = data[0]
      context.commit("setExamID", e.id)
      context.commit("setExamName", e.names)
      context.commit("setStartTime", e.startTime)
      context.commit("setStopTime", e.stopTime)
      context.commit("setExamRooms", e.roomNames)
      context.commit("setNumberOfParticipants", e.totalNumberOfParticipants)
      context.commit("setExamDuration")

      const now = new Date();
      if (now.getTime() >= (new Date(context.state.startTime).getTime() - context.state.timeBeforeAfterExam) && now.getTime() <= (new Date(context.state.stopTime).getTime()) + context.state.timeBeforeAfterExam) {
        context.commit("setModeExamInProgress", true, {root: true})
      }
      else {
        context.commit("setModeExamInProgress", false, {root: true})
      }
    }
  },

  //Checks how many students are in the room
  async updateNumberOfStudentsInRoom(context) {
    if(context.rootState.modeExamRegister) {
      try {
        const response = (
          await this.$axios.get(`${context.state.examID}/examrooms`, {
            headers: {
          //    "Accept": process.env.EXAM_ROOMS_ACCEPT_HEADER
            }
          })
        ).data;
        if(response.length > 0) {
          context.commit("setNumberOfStudentsPlannedInRoom", response[0].numberOfStudentsPlannedInRoom)
          context.commit("setNumberOfStudentsPresentInRoom", response[0].numberOfStudentsPresentInRoom)
        }
      } catch(err) {
        if (err.response) {
          console.error(err.response)
        } else if (err.request) {
          context.commit("setErrorMessage", [true, 0], {root: true})
          console.log(context.rootState.errorMessage)
        } else {
          console.error(err.message);
        }
      }
    }
  },
}
