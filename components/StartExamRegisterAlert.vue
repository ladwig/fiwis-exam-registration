<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          Prüfungsregistrierung starten
        </v-card-title>
        <v-card-text>Starten Sie die Prüfungsregistierung, sodass Studierende ihre Anwesenheit ab sofort bestätigen
          können.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-4"
            text
            @click="dialog = false"
          >
            Abbrechen
          </v-btn>
          <v-btn
            color="primary"
            @click="dialog = false"
          >
            Starten
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "StartExamRegisterAlert",
  data() {
    return {
      dialog: true
    }

  }
}
</script>

<style scoped>

</style>
