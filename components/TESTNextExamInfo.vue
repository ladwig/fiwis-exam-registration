<template>
  <base-exam-info-alert :status="status">
      <v-list
        v-if="isThereNextExam"
        class="test"
      >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon
                v-text="item.icon"
              ></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.text"
                class="headline"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    <div
      v-if="isThereNextExam == false"
    >
      {{ $t('nextExamInfo.noExamToday') }}
    </div>
  </base-exam-info-alert>
</template>

<script>
import {mapState} from "vuex";
import BaseExamInfoAlert from "./BaseExamInfoAlert";

export default {
  name: "TESTNextExamInfo",
  props: {
    status: String
  },
  components: {BaseExamInfoAlert},
  computed: {
    ...mapState({
      isThereNextExam: state => state.currentCard.isThereNextExam,
      examName: state => state.exam.examName,
      examRooms: state => state.exam.examRooms
    }),
    getTimeRange() {
      return String(this.$store.getters["exam/getStartTimeWithDate"] + ' - ' + this.$store.getters["exam/getStopTimeWithoutDate"])
    },
    items() {
      return [
        { text: this.examName, icon: 'mdi-school' },
        { text: this.getTimeRange, icon: 'mdi-clock' },
        { text: this.examRooms, icon: 'mdi-map-marker' },
      ]
    }

  },
}
</script>
<style scoped>
.test {
 background: transparent;
}
</style>
