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
      <v-toolbar-title class="font-weight-bold display-1 pl-10">{{ roomName }}</v-toolbar-title>
      <v-icon v-if="$nuxt.isOffline" color="primary">mdi-wifi-strength-alert-outline</v-icon>
      <v-spacer></v-spacer>
      <display-clock></display-clock>
    </v-app-bar>
    <v-main  style="height:100vh; overflow:hidden">
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

    }),
    axiosTestFunction() {
      this.$axios.get('', {
        params: {
          room: 'H.1.1'
        }
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });

    }
  },
  created() {

  }
}
</script>
<style>

</style>
