<template>
    <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card
        :color="status"
      >
        <v-card-text>
          <slot></slot>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "BaseExamInfoAlert",
  props: {
    status: String
  },
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
