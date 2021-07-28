<!-- Serves as a basis for the component CurrentExamResponseDialog & NextExamResponse Dialog.
Currently, the option to close the dialog manually is still missing. This is basically done by removing
the "persistent" attribute.Problem: Execution of currentCard/resetStates() should happen immediately. -->
<template>
    <v-dialog
      v-model="open"
      max-width="500"

      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-card-text
            class="ma-0 pa-0 pl-3"
          >
            <slot></slot>
          </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>


export default {
  name: "BaseResponseDialog",
  props: {
    dialog: Boolean
  },
  computed: {
    open: {
      get() {
        return this.dialog
      },
      set() {
        this.$emit("directClose")
      }

    }
  },
}
</script>
