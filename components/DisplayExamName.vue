<template>
  <v-container>
    <h3 v-if="examInProgress" class="display-2">{{ examName }}</h3>
    <h3 v-else class="display-2">Derzeit keine Prüfung in diesem Raum</h3>
    <v-btn @click="toggle">Test</v-btn>
  </v-container>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "DisplayExamName",
  computed: {
    ...mapState({
      examName: state => state.exam.examName,
      examInProgress: state => state.examInProgress
    })

  },
  methods: {
    ...mapMutations({
      toggle: 'toggle' // To set examInProgress to true/false for testing
    })
  }

}
</script>

<style scoped>

</style>
