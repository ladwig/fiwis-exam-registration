<!-- Displays the current exam name and checks for a new exam every minute. -->
<template>
  <h1 v-if="modeExamInProgress" class="display-3 font-weight-regular">{{ examName }}</h1>
  <h1 v-else class="display-3 font-weight-regular">{{ $t('currentExamName.noExamInRoom') }}</h1>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "CurrentExamName",
  computed: {
    ...mapState({
      examName: state => state.exam.examName,
    }),
    ...mapState([
      "modeExamInProgress",
    ]),
  },
  methods: {
    ...mapActions(['exam/checkRoomForExam'])
  },
  beforeMount() {
    this['exam/checkRoomForExam']()
  },
  created() {
    // Scans every minute for exam in room
    this.interval = setInterval(() => {
      this['exam/checkRoomForExam']()
    }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>
