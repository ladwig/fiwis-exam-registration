<template>
      <v-progress-linear
        indeterminate
        color="primary"
        height="15"
        v-if="cardIsLoading"
      ></v-progress-linear>

      <v-progress-linear
        disabled
        color="primary"
        height="15"
        v-else
      ></v-progress-linear>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "ProgressBar",
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      "cardIsLoading"
    ])
  },
  methods: {
    ...mapMutations([

      ]
    ),
    ...mapActions([

      ]
    ),
  }

}
</script>

<style scoped>

</style>
