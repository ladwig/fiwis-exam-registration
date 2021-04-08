<template>
  <v-app>
    <v-app-bar
      color="primary"
      flat
      app
    >
      <v-img
        class="mx-3"
        src="../logo.png"
        max-height="100"
        max-width="100"
        contain
      ></v-img>
      <v-btn @click="toggleExamInProgress">In Progress</v-btn>
      <v-btn @click="toggleNextExam">Next Exam</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text font-weight-bold display-1">{{ roomName }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  computed: {
    ...mapState([
      "roomName"
    ])
  },
  methods: {
    ...mapMutations({
      toggleExamInProgress: 'toggleExamInProgress', // To set examInProgress to true/false for testing
      toggleNextExam: 'toggleNextExam' // To set isThereNextExam to true/false for testing
    })
  }
}
</script>
<style>


</style>
