<template>
  <!-- "generic" component, used for CurrentExamInfo and NextExamInfo -->
  <div>
    <h2 class="display-3 darker--text font-weight-regular"> {{ headline }} </h2>
    <div class="mt-2">
      <v-icon color="darker" size="24" class="middle"> {{ icon }} </v-icon>
      <div class="d-inline-block headline font-weight-regular darker--text middle"> {{ returnText ? returnText : more }} </div>
    </div>
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
.middle {
  vertical-align: middle
}

</style>
