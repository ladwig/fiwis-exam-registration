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
        max-height="150"
        max-width="150"
        contain
      ></v-img>
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
