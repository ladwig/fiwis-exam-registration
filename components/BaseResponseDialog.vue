<template>
    <v-dialog
      v-model="dialog"
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

export default {
  name: "BaseResponseDialog",
  props: {
    dialog: {
      default: false
    }
  },
}
</script>
