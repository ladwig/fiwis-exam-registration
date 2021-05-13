<template>

  <v-container class="pa-0 ma-0">
    <v-chip
      color="secondary"
      label
      outlined
      class="body-1"
    >
      {{ getStartTimeWithoutDate }} – {{ getStopTimeWithoutDate }} Uhr
    </v-chip>
    <v-chip v-if="new Date(startTime) < new Date()"
      color="secondary"
      label
      outlined
      class="body-1 font-weight-bold"
    >{{ $t('currentExamTime.dontDisturb') }}
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
