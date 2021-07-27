<!-- Serves as a basis for the component InformationPanel -->
<template>
  <v-container>
    <h2 class="display-3 darker--text font-weight-regular"> {{ headline }} </h2>
    <v-row no-gutters class="mt-2" >
      <v-col align="center"
             justify="center" cols="auto" class="ma-0 pa-0 mr-3">
        <v-icon color="darker" size="36"> {{ icon }} </v-icon>
      </v-col>
      <v-col  cols="10" class="ma-0 pa-0">
        <div class="headline font-weight-regular darker--text "> {{  more }} </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "BaseInformationPanel",
  props: {
    headline: String,
    icon: String,
    more: String,
  }
}
</script>
