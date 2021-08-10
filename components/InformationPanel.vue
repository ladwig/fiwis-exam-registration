<!-- Displays the current application mode (regist or just check) and possible user actions -->
<template>
  <div v-if="examInProgressMode">
    <base-information-panel
      v-if="registModeActive"
      :headline="$t('currentExamInfo.registerForExamNowHeadline')"
      icon="mdi-information-outline"
      :more="$t('currentExamInfo.registerForExamNowMore')"
    />

    <base-information-panel
      v-else
      :headline="$t('currentExamInfo.checkStatusHeadline')"
      icon="mdi-information-outline"
      :more="$t('currentExamInfo.checkStatusMore')"
    />
  </div>
  <div v-else>
    <base-information-panel
      :headline="$t('nextExamInfo.showNextExamHeadline')"
      icon="mdi-information-outline"
      :more="$t('nextExamInfo.showNextExamMore')"
    />
  </div>
</template>
<script>
import BaseInformationPanel from "./BaseInformationPanel";
export default {
  name: "InformationPanel",
  components: {BaseInformationPanel},
  props: {
    registModeActive: Boolean,
    examInProgressMode: Boolean,
  },
}
</script>
