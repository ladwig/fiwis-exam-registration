<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          Fehler aufgetreten
        </v-card-title>
        <v-card-text>
          {{messages[errorMessage.msgNmbr]}}
          {{errorMessage.response}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closePopup()"
          >
            Okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "ErrorMessageAlert",
  data() {
    return {
      dialog: true,
      messages: [
      "Keine Verbindung zur FIWIS API möglich. Bitte nochmals probieren. Falls der Fehler weiterhin auftritt, überprüfen Sie die Internetverbindung oder kontaktieren Sie einen Administrator.",
        "Fehlermeldung vom Server:",
      ]
    }
  },
  computed: {
    ...mapState([
      "errorMessage"
    ])
  },
  methods: {
    ...mapMutations([
      "setErrorMessage"
      ]
    ),
    closePopup() {
      this.dialog = false
      this.setErrorMessage([false, null, null])
    }
  }
}
</script>

<style scoped>

</style>
