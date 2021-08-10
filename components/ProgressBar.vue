<!-- Shows loading state and positive/negative response color -->
<template>
  <v-progress-linear
    indeterminate
    color="primary"
    height="15"
    v-if="loading && !status"
  ></v-progress-linear>
  <v-progress-linear
    value="100"
    :color="status"
    height="15"
    v-else-if="status"
  ></v-progress-linear>
  <v-progress-linear
    disabled
    color="primary"
    height="15"
    v-else
  ></v-progress-linear>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    status: String,
    loading: Boolean,
  }
}
</script>
