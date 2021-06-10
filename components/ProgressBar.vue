<template>
      <v-progress-linear
        indeterminate
        color="primary"
        height="15"
        v-if="loading"
      ></v-progress-linear>

      <v-progress-linear
        disabled
        color="primary"
        height="15"
        v-else
      ></v-progress-linear>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ProgressBar",
  props: {
    loading: Boolean,
  }
}
</script>
