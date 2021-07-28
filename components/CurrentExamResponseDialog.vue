<!-- Display of the returnText for checking a scanned card. -->
<template>
  <base-response-dialog
    :dialog="dialog"
    @directClose="onDirectClose"
  >
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
  </base-response-dialog>
</template>

<script>
import BaseResponseDialog from "./BaseResponseDialog";
import {mapActions, mapMutations} from "vuex";

export default {
  name: "CurrentExamResponseDialog",
  props: {
    dialog: Boolean,
    status: String,
    returnText: String,
  },
  components: {BaseResponseDialog},
  methods: {
    ...mapActions([
      "currentCard/resetWithTimeout"
    ]),

    // When dialog is closed manually with a tap (Temporary solution)
    onDirectClose() {
      this["currentCard/resetWithTimeout"](false)
    }
  },
}
</script>
