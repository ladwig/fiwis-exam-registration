export const state = () => ({
  examID: null,
  examName: null,
  startTime: null, // "2021-04-02T20:00:00+02:00"
  stopTime: null,
  examRooms: null, // "H.1.2, H.1.3"
  numberOfParticipants: null,
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
  async checkRoomForExam(context) {
    const exam = (
      await this.$axios.get('', {
        params: {
          room: context.rootState.roomName
        }
      })
    ).data;

    if (exam.length > 0) {
      const e = exam[0]
      context.commit("setExamID", e.id)
      context.commit("setExamName", e.names)
      context.commit("setStartTime", e.startTime)
      context.commit("setStopTime", e.stopTime)
      context.commit("setExamRooms", e.roomNames)
      context.commit("setNumberOfParticipants", e.totalNumberOfParticipants)
      context.commit("setExamDuration")
      console.log("works -> exam")
      const now = new Date();

      if (now.getTime() >= (new Date(context.state.startTime).getTime() - context.state.timeBeforeAfterExam)) {
        context.commit("setModeExamInProgress", true, {root: true})
      }
      else if(1) {

      }
      else
       {
        context.commit("setModeExamInProgress", false, {root: true})
      }
    }
  },

  async checkCardForExam(context, cardnumber) {
    const response = (
      await this.$axios.get('', {
        params: {
          cardnumber: cardnumber
        }
      })
    ).data;
    context.commit("setCardNumber", cardnumber, {root: true})
    if (response.length > 0) {
      context.commit("setIsThereNextExam", true, {root: true})
      const e = response[0]
      context.commit("setExamName", e.names)
      context.commit("setStartTime", e.startTime)
      context.commit("setStopTime", e.stopTime)
      context.commit("setExamRooms", e.roomNames)
    } else {
      context.commit("setIsThereNextExam", false, {root: true})
    }
  },

  checkRegistForExam(context, cardnumber) {
    const body = {
      idcardnumber: cardnumber,
      room: context.rootState.roomName,
      parameter: 1,
    }
    console.log(body)
    this.$axios.post(`${context.state.examID}/scannedcards`, body, {})
      .then((response) => {
        const resURL = response.headers.location
        this.$axios.get(resURL, {})
          .then((response) => {
            const data = response.data

            if (data.returnCode === 300) {
              context.commit("setIsExaminer", true, {root: true})
            }
            else if (data.returnCode === 100) {
              context.commit("setIsRegisteredStudent", true, {root: true})
            }
            else {
              context.commit("setIsRegisteredStudent", false, {root: true})  //To remove clipping "Angemeldet / nicht angemeldet" in CurrentExamInfo
            }
            console.log(response.data.returnText)
          })
      })
  }
}
