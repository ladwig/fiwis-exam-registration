<template>
  <h3 v-if="modeExamInProgress" class="display-2">{{ examName }}</h3>
  <h3 v-else class="display-2">{{ $t('currentExamName.noExamInRoom') }}</h3>

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
      "modeJustCheck",
    ]),
  },

  methods: {
    ...mapActions(['exam/checkRoomForExam'])
  },
  created() {

    // nach 1 Min. neue Prüfung suchen
    this['exam/checkRoomForExam']()
    window.setInterval(() => {
      this['exam/checkRoomForExam']()
    }, 60000)
  }

}
</script>

<style scoped>

</style>
