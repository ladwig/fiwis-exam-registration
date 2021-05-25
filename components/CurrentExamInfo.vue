<template>
    <div v-if="modeExamRegister">
<scan-information-panel
  :headline="$t('currentExamInfo.registerForExamNowHeadline')"
  icon="mdi-information-outline"
  :return-text="this.returnText"
  :more="$t('currentExamInfo.registerForExamNowMore')"
></scan-information-panel>

  </div>

    <div v-else>
      <h2 class="display-2 primary--text font-weight-light">{{ $t('currentExamInfo.checkStatusHeadline') }}</h2>
      <div v-if="returnText">
        <v-icon>mdi-information-outline</v-icon>
        {{this.returnText}}</div>
      <div v-else>
        <v-icon>mdi-information-outline</v-icon>
        {{ $t('currentExamInfo.checkStatusMore') }}
      </div>
    </div>
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
    }),
    ...mapState([
      "modeExamRegister",
      "isRegisteredStudent",
      "cardNumber",
      "cardIsLoading",
      "returnText"
    ]),
  },

  methods: {},
  created() {

  }

}
</script>

<style scoped>

</style>
