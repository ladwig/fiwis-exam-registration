<template>
  <div>
    <scan-information-panel
      :headline="$t('nextExamInfo.showNextExamHeadline')"
      icon="mdi-information-outline"
      :more="$t('nextExamInfo.showNextExamMore')"
    />
    <div v-if="isThereNextExam">
     <li>
       {{examName}}
     </li>
      <li>
        {{examRooms}}
      </li>
      <li>
        {{getStartTimeWithDate}} -- {{getStopTimeWithoutDate}}
      </li>
    </div>
    <div v-if="isThereNextExam == false">
      Keine weitere Prüfung gefunden
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NextExamInfo",
  computed: {
    ...mapState([
      "returnText",
      "isThereNextExam"
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
  },
}
</script>

<style scoped>

</style>
