<!-- Displays the next exam for the scanned card (when there is no current exam) -->
<template>
  <base-response-dialog
    :dialog="dialog"
  >
      <v-list
        v-if="isThereNextExam"
      >
        <v-subheader class="headline">
          {{ $t('nextExamInfo.yourNextExam') }}
        </v-subheader>
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
      v-if="isThereNextExam === false"
      class="display-1 pa-5"
    >
      {{ $t('nextExamInfo.noExamToday') }}
    </div>
  </base-response-dialog>
</template>

<script>
import {mapState, mapGetters } from "vuex";
import BaseResponseDialog from "./BaseResponseDialog";

export default {
  name: "NextExamResponseDialog",
  props: {
    dialog: Boolean
  },
  components: {BaseResponseDialog},
  computed: {
    ...mapState([
      "infoDialogStatus"
    ]),
    ...mapState({
      isThereNextExam: state => state.currentCard.isThereNextExam,
      examName: state => state.exam.examName,
      examRooms: state => state.exam.examRooms,
    }),
    ...mapGetters([
      "exam/getStartTimeWithDate",
      "exam/getStopTimeWithoutDate"
    ]),
    getTimeRange() {
      return String(
        this["exam/getStartTimeWithDate"]
        + ' - ' +
        this["exam/getStopTimeWithoutDate"]
        + ' ' +
        this.$i18n.t('displayClock.suffix')
      )
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
