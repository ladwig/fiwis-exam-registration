<template>

  <v-container>
    <div>{{ getStartTimeWithoutDate }} - {{ getStopTimeWithoutDate }}</div>
    <div v-if="new Date(startTime) < new Date()">Prüfung, bitte nicht stören!</div>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CurrentExamTime",
  computed: {
    ...mapState({
      startTime: state => state.exam.startTime
    }),
    getStartTimeWithDate(state) {
      return this.$store.getters["exam/getStartTimeWithDate"]
    },
    getStopTimeWithoutDate(state) {
      return this.$store.getters["exam/getStopTimeWithoutDate"]
    },
    getStartTimeWithoutDate(state) {
      return this.$store.getters["exam/getStartTimeWithoutDate"]
    }
  }
}
</script>

<style scoped>

</style>
