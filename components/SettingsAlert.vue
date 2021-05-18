<template>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"

    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('settingsAlert.settingsAlertHeadline') }}
        </v-card-title>
        <v-card-text>{{ $t('settingsAlert.settingsAlertMore') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-4"
            text
            @click="closePopup(0)"
          >
            {{ $t('settingsAlert.cancel') }}
          </v-btn>
          <v-btn
            color="secondary darken-4"
            text
            @click="closePopup(2)"
          >
            Raum festlegen
          </v-btn>
          <v-btn v-if="!modeExamRegister"
            color="primary"
            @click="closePopup(1)"
          >
            {{ $t('settingsAlert.start') }}
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "SettingsAlert",
  data() {
    return {
      dialog: true
    }
  },
  computed: {
    ...mapState([
      "cardNumber",
      "modeExamRegister"
    ])
  },
  methods: {
    ...mapMutations([
        "setIsExaminer",
        "setModeExamRegister",
        "setRoomName",
      ]
    ),
    ...mapActions([
      "exam/checkRegistForExam",
      "resetAllValues"
    ]),
    //Always close the modal and removes examiner data. Case 1 -> Starts exam register mode
    closePopup(action) {
      if (action == 1) {
        this['exam/checkRegistForExam']([this.cardNumber, true])
        this.setModeExamRegister(true)
      }
      else if(action == 2) {
        window.location.reload(true)
      }
      this.setIsExaminer(false)
      this.dialog = false

    }
  }
}
</script>

<style scoped>

</style>
