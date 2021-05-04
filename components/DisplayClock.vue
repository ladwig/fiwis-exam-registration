<template>
  <v-container fluid class="clock-container">
    <v-row class="clock justify-center">
      {{ date }} <br>
      {{ time }} {{ $t('displayClock.suffix') }}
    </v-row>

  </v-container>

</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "DisplayClock",
  data() {
    return {
      interval: null,
      time: null,
      date: null,
    }
  },
  beforeDestroy() {
    // Vermeiden von Memory Leak
    clearInterval(this.interval)
  },
  created() {
    // Jede Sekunde Update
    this.interval = setInterval(() => {

      this.time = Intl.DateTimeFormat('de-DE', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format()

      this.date = Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format()
    }, 1000)
  },
  methods: {
    ...mapMutations({})
  }
}
</script>

<style scoped>
.clock-container {

}

.clock {
  text-align: center;
  border: 2px solid var(--v-primary-base);
}
</style>
