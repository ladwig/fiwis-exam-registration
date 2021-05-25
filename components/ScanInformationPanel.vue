<template>
  <div>
    <h2 class="display-2 primary--text font-weight-light"> {{ headline }} </h2>
    <v-icon> {{ icon }} </v-icon>
    <div style="display: inline-block" v-if="returnText"> {{ returnText }} </div>
    <div style="display: inline-block" v-else> {{ more }} </div>
  </div>
</template>

<script>

export default {
  name: "ScanInformationPanel",
  props: {
    headline: String,
    icon: String,
    more: String,
    returnText: String,
  }
}

</script>

<style scoped>

</style>
