<template>

  <v-container class="ma-0 pa-0">
    <div v-if="new Date(startTime) < new Date()">{{ $t('currentExamTime.dontDisturb') }}</div>
    <v-chip
      color="primary"
      label
      outlined
    >
      {{ getStartTimeWithoutDate }} – {{ getStopTimeWithoutDate }} Uhr
    </v-chip>

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
