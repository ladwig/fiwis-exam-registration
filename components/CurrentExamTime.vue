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
    <v-chip v-if="new Date(startTime) < now"
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
  data() {
    return {
      now: new Date()
    }
  },
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
  },

  updated() {
    this.now = new Date()
  }
}
</script>

<style scoped>
.blink {
 /* animation: blinker 1.5s step-start infinite; */
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
