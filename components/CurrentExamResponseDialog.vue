<!-- Display of the returnText for checking a scanned card. -->
<template>
  <base-response-dialog
    :dialog="dialog"
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

export default {
  name: "CurrentExamResponseDialog",
  props: {
    dialog: Boolean,
    status: String,
    returnText: String,
  },
  components: {BaseResponseDialog},
}
</script>
