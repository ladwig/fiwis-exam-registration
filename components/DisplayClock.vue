<template>
  <div>{{ time }}</div>
</template>

<script>
export default {
  name: "DisplayClock",
  data() {
    return {
      interval: null,
      time: null
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
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format()
    }, 1000)
  },
}
</script>

<style scoped>

</style>
