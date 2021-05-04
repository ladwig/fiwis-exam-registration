<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('startExamRegisterAlert.startExamRegisterHeadline') }}
        </v-card-title>
        <v-card-text>{{ $t('startExamRegisterAlert.startExamRegisterMore') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-4"
            text
            @click="closePopup(0)"
          >
            {{ $t('startExamRegisterAlert.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="closePopup(1)"
          >
            {{ $t('startExamRegisterAlert.start') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "StartExamRegisterAlert",
  data() {
    return {
      dialog: true
    }
  },
  methods: {
    ...mapMutations([
        "setIsExaminer",
        "setModeExamRegister",
      ]
    ),
    //It will always close the modal and removes examiner data. Case 1 -> Starts exam register mode
    closePopup(action) {
      if (action == 1) {
        this.setModeExamRegister(true)
      }
      this.setIsExaminer(false)
      this.dialog = false

    }
  }
}
</script>

<style scoped>

</style>
