<template>
  <div>
    <scan-information-panel
      :headline="$t('nextExamInfo.showNextExamHeadline')"
      icon="mdi-information-outline"
      :more="$t('nextExamInfo.showNextExamMore')"
    />
      <ul v-if="isThereNextExam">
        <li>
          {{examName}}
        </li>
        <li>
          {{examRooms}}
        </li>
        <li>
          {{getStartTimeWithDate}} -- {{getStopTimeWithoutDate}}
        </li>
      </ul>
    <div v-if="isThereNextExam == false">
      {{ $t('nextExamInfo.noExamToday') }}
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NextExamInfo",
  computed: {
    ...mapState({
      isThereNextExam: state => state.currentCard.isThereNextExam,
      examName: state => state.exam.examName,
      examRooms: state => state.exam.examRooms
    }),
    getStartTimeWithDate(state) {
      return this.$store.getters["exam/getStartTimeWithDate"]
    },
    getStopTimeWithoutDate(state) {
      return this.$store.getters["exam/getStopTimeWithoutDate"]
    },
  },
}
</script>
