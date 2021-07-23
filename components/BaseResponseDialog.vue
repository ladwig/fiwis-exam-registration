<template>
    <v-dialog
      v-model="open"
      max-width="500"
persistent
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

import {mapActions} from "vuex";

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
        // resetStates, but cant fix it rn
      }
    }
  },
  methods: {
    ...mapActions([
      "currentCard/resetStates"
    ]),
  },
/* watch: {
    dialog:function(newValue, old) {
      console.log(old)
      if(!newValue) {
        this['currentCard/resetStatesWithDialogClick']()
      }
    }
  } */
}
</script>
