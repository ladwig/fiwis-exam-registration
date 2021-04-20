<template>
  <h3 v-if="modeExamInProgress" class="display-2">{{ examName }}</h3>
  <h3 v-else class="display-2">Derzeit findet keine Prüfung in diesem Raum statt</h3>

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
    ...mapActions(['exam/loadNextExam'])
  },
  created() {

    // nach 1 Min. neue Prüfung suchen
    this['exam/loadNextExam']()
    window.setInterval(() => {
      this['exam/loadNextExam']()
    }, 6000)
  }

}
</script>

<style scoped>

</style>
