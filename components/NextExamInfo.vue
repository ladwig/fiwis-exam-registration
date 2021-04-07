<template>

  <v-card
    class="mx-auto"
    max-width="400"
    tile
    v-if="isThereNextExam"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">Ihre nächste Prüfung:</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon left>
            mdi-school-outline
          </v-icon>
          {{ examName }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon left>
            mdi-clock-time-four-outline
          </v-icon>
          {{ getStartTimeWithDate }} - {{ getStopTimeWithoutDate }} Uhr
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>

        <v-list-item-title>

          <v-icon left>
            mdi-map-marker-outline
          </v-icon>
          {{ rooms }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
  <h4 v-else class="display-1"> Sie sind heute für keine weitere Prüfung angemeldet</h4>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NextExamInfo",
  computed: {
    ...mapState([
      "isThereNextExam",
      "examInProgress",
    ]),
    ...mapState({
      examName: state => state.exam.examName,
      rooms: state => state.exam.rooms
    }),
    getStartTimeWithDate(state) {
      return this.$store.getters["exam/getStartTimeWithDate"]
    },
    getStopTimeWithoutDate(state) {
      return this.$store.getters["exam/getStopTimeWithoutDate"]
    }
  }
}
</script>

<style scoped>

</style>
