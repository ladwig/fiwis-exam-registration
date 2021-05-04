<template>
  <div v-if="getCardNumber">
    <v-card
      class="mx-auto"
      max-width="400"
      tile
      v-if="isThereNextExam"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">{{ $t('nextExamInfo.yourNextExam') }}</v-list-item-title>
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
            {{ getStartTimeWithDate }} - {{ getStopTimeWithoutDate }}  {{ $t('displayClock.suffix') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>

          <v-list-item-title>

            <v-icon left>
              mdi-map-marker-outline
            </v-icon>
            {{ examRooms }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <h4 v-else class="display-1">{{ $t('nextExamInfo.noExamToday') }}</h4>
  </div>
  <div v-else>
    <h4 class="display-1 primary--text">{{ $t('nextExamInfo.showNextExamHeadline') }}</h4>
    <p>{{ $t('nextExamInfo.showNextExamMore') }}</p>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NextExamInfo",
  computed: {
    ...mapState([
      "isThereNextExam",
      "modeExamInProgress",
      "cardNumber",
    ]),
    ...mapState({
      examName: state => state.exam.examName,
      examRooms: state => state.exam.examRooms
    }),
    getStartTimeWithDate(state) {
      return this.$store.getters["exam/getStartTimeWithDate"]
    },
    getStopTimeWithoutDate(state) {
      return this.$store.getters["exam/getStopTimeWithoutDate"]
    },
    getCardNumber(state) {
      return this.$store.getters["getCardNumber"]
    }
  },
}
</script>

<style scoped>

</style>
