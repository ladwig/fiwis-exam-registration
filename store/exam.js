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

  getFreeSeats(state) {
    return (state.numberOfStudentsPlannedInRoom - state.numberOfStudentsPresentInRoom)
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
        context.commit("setErrorMessage", err, {root: true})
      })
  },

  processRoomForExam(context, data) {
    if (data.length > 0) { // TODO: If  data[1].startTime < data[0].endTime + timeBeforeAfterExam (1h) AND date.now > data[0].endTime -> switch from displaying [0] to [1]
      const e = data[0]
      context.commit("setExamID", e.id)
      context.commit("setExamName", e.names)
      context.commit("setStartTime", e.startTime)
      context.commit("setStopTime", e.stopTime)
      context.commit("setExamRooms", e.roomNames)
      context.commit("setNumberOfParticipants", e.totalNumberOfParticipants)
      context.commit("setExamDuration")
      context.commit("setModeExamInProgress", true, {root: true})
      context.dispatch("checkExamModeStatus", e.examroomUrl.href)
        .then((status) => {
          context.commit("setModeExamRegister", status, {root: true})
        })

     const now = new Date();
      if (now.getTime() >= (new Date(context.state.startTime).getTime() - context.state.timeBeforeAfterExam) && now.getTime() <= (new Date(context.state.stopTime).getTime()) + context.state.timeBeforeAfterExam) {
        context.commit("setModeExamInProgress", true, {root: true})
      }
      else {
        context.commit("setModeExamInProgress", false, {root: true})
      }
    }
  },

 async checkExamModeStatus(context, url) {
    const res = await this.$axios.get(url, {
      headers: {
        "Accept": process.env.EXAM_STATUS_ACCEPT_HEADER
      }
    })
   const roomDataIndex = res.data.findIndex(a => a.roomName == context.rootState.roomName)
   const state = res.data[roomDataIndex].examRegistrationState
   if(state == 0) {
     return false
   }
   else if (state == 1) {
     return true
   }
  },

  //Checks how many students are in the room
  async updateNumberOfStudentsInRoom(context) {
    if(context.rootState.modeExamRegister) {
      try {
        const res = (
          await this.$axios.get(`${context.state.examID}/examrooms`, {
            headers: {
              "Accept": process.env.EXAM_ROOMS_ACCEPT_HEADER
            }
          })
        ).data;
        if(res.length > 0) {
          const roomDataIndex = res.findIndex(a => a.roomName == context.rootState.roomName)
          context.commit("setNumberOfStudentsPlannedInRoom", res[roomDataIndex].numberOfStudentsPlannedInRoom)
          context.commit("setNumberOfStudentsPresentInRoom", res[roomDataIndex].numberOfStudentsPresentInRoom)
        }
      } catch(err) {
        context.commit("setErrorMessage", err, {root: true})
      }
    }
  },
}
