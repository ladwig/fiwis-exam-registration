<template>
  <v-app>
    <v-app-bar
      color="secondary"
      flat
      app
    >
      <v-toolbar-title @click="reloadPage()" class="font-weight-bold display-1 pl-10 darker--text">{{ roomName }}</v-toolbar-title>
      <v-icon v-if="$nuxt.isOffline" color="primary">mdi-wifi-strength-alert-outline</v-icon>
      <!-- Buttons for testing in dev mode only -->
      <div v-if="dev">
        <v-btn @click="changeMode()">Send admin id</v-btn>
        <v-btn @click="regist()">Regist student id</v-btn>
        <v-btn @click="check()">Check student id</v-btn>
      </div>
      <v-spacer></v-spacer>
      <display-clock></display-clock>
    </v-app-bar>
    <v-main style="height:100vh; overflow:hidden">
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
    ]),
    dev() {
      if(process.env.NODE_ENV !== 'production') {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions([
      'currentCard/checkCardForThisExam',
      'currentCard/checkCardForNextExam'
      ]),

    reloadPage() {
      if(this.dev) {
        window.location.reload()
      }
    },
    // Only in dev
    changeMode() {
      this['currentCard/checkCardForThisExam']("36128986159263748")
    },
    // Only in dev
    regist() {
      this['currentCard/checkCardForThisExam']("36128986026611204")
    },
    // Only in dev
    check() {
      this['currentCard/checkCardForNextExam']("36128986026611204")
    },
  },
}
</script>
