<template>

    <scan-information-panel
      v-if="modeExamRegister"
      :headline="$t('currentExamInfo.registerForExamNowHeadline')"
      icon="mdi-information-outline"
      :return-text="this.returnText"
      :more="$t('currentExamInfo.registerForExamNowMore')"
    />

  <scan-information-panel
    v-else
    :headline="$t('currentExamInfo.checkStatusHeadline')"
    icon="mdi-information-outline"
    :return-text="this.returnText"
    :more="$t('currentExamInfo.checkStatusMore')"
  />

</template>

<script>
import {mapState} from "vuex";
import ScanInformationPanel from "./ScanInformationPanel";

export default {
  name: "CurrentExamInfo",
  components: {ScanInformationPanel},
  computed: {
    ...mapState({
      examName: state => state.exam.examName,
      returnText: state => state.currentCard.returnText
    }),
    ...mapState([
      "modeExamRegister",
    ]),
  },

  methods: {},
}
</script>

<style scoped>

</style>
