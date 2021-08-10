<!-- Display of the start and end time of current exam, also a do not disturb warning when currentTime > startTime -->
<template>
  <v-container class="pa-0 ma-0">
    <v-chip
      color="secondary"
      label
      outlined
      class="headline font-weight-regular"
    >
      {{ getStartTimeWithoutDate }} – {{ getStopTimeWithoutDate }} Uhr
    </v-chip>
    <v-chip
      v-if="attentionSign"
      color="secondary"
      label
      outlined
      class="headline font-weight-regular blink"
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
      startTime: state => state.exam.startTime,
      attentionSign: state => state.attentionSign
    }),
    getStopTimeWithoutDate(state) {
      return this.$store.getters["exam/getStopTimeWithoutDate"]
    },
    getStartTimeWithoutDate(state) {
      return this.$store.getters["exam/getStartTimeWithoutDate"]
    }
  },
}
</script>

<style scoped>
.blink {
  animation: blinker 1.5s step-start infinite;
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
