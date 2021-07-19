<template>
  <base-exam-info-alert>
    <v-row class="ma-0 pa-0">
      <v-col
        cols="1"
        class="mr-2"
      >
        <v-icon
          :color="status"
          large
        >
          mdi-information
        </v-icon>
      </v-col>
      <v-col class="headline">
        {{ returnText }}
      </v-col>
    </v-row>
  </base-exam-info-alert>
</template>

<script>
import {mapState} from "vuex";
import BaseExamInfoAlert from "./BaseExamInfoAlert";

export default {
  name: "TESTCurrentExamInfo",
  props: {
    status: String,
  },
  components: {BaseExamInfoAlert},
  computed: {
    ...mapState({
      returnText: state => state.currentCard.returnText
    }),
    ...mapState([
      "modeExamRegister",
    ]),
  },
}
</script>
