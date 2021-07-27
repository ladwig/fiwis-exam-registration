<!-- Shows the current time, used in layouts/default.vue  -->
<template>
  <v-container fluid class="clock-container">
    <div class="clock">
      <div class="title darker--text">{{ time }} {{ $t('displayClock.suffix')}} <br></div>
      {{ date }}
    </div>

  </v-container>

</template>

<script>

export default {
  name: "DisplayClock",
  data() {
    return {
      interval: null,
      time: null,
      date: null,
    }
  },

  created() {
    this.setTime()
    this.interval = setInterval(() => {
      this.setTime()
    }, 1000)
  },

  beforeDestroy() {
    clearInterval(this.interval)
  },

  methods: {
    setTime() {
      this.time = new Date() .toLocaleString('de-DE', {
        hour: 'numeric',
        minute: 'numeric'
      })
      this.date = new Date().toLocaleString('de-DE', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      })
    }
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
