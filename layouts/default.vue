<template>
  <v-app>
    <v-app-bar
      color="secondary"
      flat
      app
    >
  <!--    <v-img
        class="mx-3"
        src="../logo.png"
        max-height="150"
        max-width="150"
        contain
      ></v-img> -->
      <v-toolbar-title @click="reloadPage()" class="font-weight-bold display-1 pl-10 darker--text">{{ roomName }}</v-toolbar-title>
      <v-icon v-if="$nuxt.isOffline" color="primary">mdi-wifi-strength-alert-outline</v-icon>
      <v-button @click="changeMode()">Mode</v-button>
      <v-spacer></v-spacer>
      <display-clock></display-clock>
    </v-app-bar>
    <v-main  style="height:100vh; overflow:hidden">
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  computed: {
    ...mapState([
      "roomName"
    ])
  },
  methods: {
    ...mapActions(['currentCard/checkCardForThisExam']),
    reloadPage() {
      window.location.reload(true)
    },
    changeMode() {
      this['currentCard/checkCardForThisExam'](1234)
    }
  },
  created() {

  }
}
</script>
<style>

</style>
