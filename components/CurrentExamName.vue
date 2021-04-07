<template>

  <h3 v-if="examInProgress" class="display-2">{{ examName }}</h3>
  <h3 v-else class=" display-2">Derzeit findet keine Prüfung in diesem Raum statt</h3>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CurrentExamName",
  computed: {
    ...mapState({
      examName: state => state.exam.examName,
      examInProgress: state => state.examInProgress
    })
  },
  methods: {}

}
</script>

<style scoped>

</style>
