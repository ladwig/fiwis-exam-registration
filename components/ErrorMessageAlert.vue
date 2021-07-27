<!-- Is opened when the error state is set to true. An error state is set when a store function throws an error. -->
<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('errorMessageAlert.errorHeadline') }}
        </v-card-title>
        <v-card-text>
          {{ $t('errorMessageAlert.errorMore') }}
          <br>
         <strong class="red--text">{{errorMessage.response.status}} {{errorMessage.message}}</strong>
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
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "ErrorMessageAlert",
  data() {
    return {
      dialog: true,
    }
  },
  computed: {
    ...mapState([
      "errorMessage"
    ])
  },
  methods: {
    ...mapMutations([
      "setErrorMessage",
      "setCardIsLoading"
      ]
    ),
    closePopup() {
      this.dialog = false
      this.setErrorMessage(null)
      this.setCardIsLoading(false)
    }
  }
}
</script>
