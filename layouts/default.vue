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
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text font-weight-bold">{{ roomName }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState([
      "roomName"
    ])
  },
}
</script>
