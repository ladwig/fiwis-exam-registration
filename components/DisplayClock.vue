<template>
  <v-container fluid class="clock-container">
    <div class="clock">
      <div class="title darker--text">{{ time }} {{ $t('displayClock.suffix')}} <br></div>
      {{ date }}
    </div>

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
      }).format()

      this.date = Intl.DateTimeFormat('de-DE', {
        weekday: 'long',
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
  width: 180px;
}

.clock {
text-align: right;
}
</style>
