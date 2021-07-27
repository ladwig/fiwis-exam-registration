<!-- Admin / Examiner option panel for changing application mode or language -->
<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('settingsAlert.settingsAlertHeadline') }}
        </v-card-title>
        <v-card-text>{{ $t('settingsAlert.settingsAlertMore') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-select
            v-model="$i18n.locale"
            :items="langs"
            :label="$t('language')"
            dense
          >
          </v-select>
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
            {{ $t('settingsAlert.restart') }}
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
      dialog: true,
      langs: ['en', 'de']
    }
  },
  computed: {
    ...mapState({
        cardNumber: state => state.currentCard.cardNumber,
    }),
  },
  props: {
    modeExamRegister: Boolean,
  },
  methods: {
    ...mapMutations([
        "currentCard/setIsExaminer",
        "setModeExamRegister",
      ]
    ),
    ...mapActions([
      "currentCard/startModeExamRegister",
      "currentCard/resetStates"
    ]),

    //Always close the modal and removes examiner data. Case 1 -> Starts exam register mode
    closePopup(action) {
      this.dialog = false
      this["currentCard/setIsExaminer"](false)
      this["currentCard/resetStates"]()
      if (action === 1) {
        this['currentCard/startModeExamRegister']()
      }
      else if(action === 2) {
        window.location.reload()
      }
    }
  }
}
</script>
