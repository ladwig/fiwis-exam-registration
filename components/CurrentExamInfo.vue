<template>

    <scan-information-panel
      v-if="registModeActive"
      :headline="$t('currentExamInfo.registerForExamNowHeadline')"
      icon="mdi-information"
      :return-text="this.returnText"
      :more="$t('currentExamInfo.registerForExamNowMore')"
    />

  <scan-information-panel
    v-else
    :headline="$t('currentExamInfo.checkStatusHeadline')"
    icon="mdi-information"
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
  props: {
    registModeActive: Boolean,
  },
  computed: {
    ...mapState({
      returnText: state => state.currentCard.returnText
    }),
    ...mapState([
      "modeExamRegister",
    ]),
  },
}
</script>
