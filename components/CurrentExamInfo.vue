<template>
  <div v-if="cardNumber != null">
    <div v-if="isRegisteredStudent">
      <h2 class="display-2 primary--text font-weight-light">{{ $t('currentExamInfo.isRegisteredStudentHeadline') }}</h2>
      <p>{{ $t('currentExamInfo.isRegisteredStudentMore') }}</p>
    </div>
    <div v-else>
      <h2 class="display-2 primary--text font-weight-light">{{ $t('currentExamInfo.isNotRegisteredStudentHeadline') }}</h2>
      <p>{{ $t('currentExamInfo.isNotRegisteredStudentMore') }}</p>
    </div>
  </div>
  <div v-else>
    <div v-if="modeExamRegister">
    <h2 class="display-2 primary--text font-weight-light">{{ $t('currentExamInfo.registerForExamNowHeadline') }}</h2>
    <p>{{ $t('currentExamInfo.registerForExamNowMore') }}</p>
  </div>
    <div v-else>
      <h2 class="display-2 primary--text font-weight-light">{{ $t('currentExamInfo.checkStatusHeadline') }}</h2>
      <p>{{ $t('currentExamInfo.checkStatusMore') }}</p>
    </div></div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CurrentExamInfo",
  computed: {
    ...mapState({
      examName: state => state.exam.examName,
    }),
    ...mapState([
      "modeExamRegister",
      "isRegisteredStudent",
      "cardNumber",
      "cardIsLoading"
    ]),
  },

  methods: {},
  created() {

  }

}
</script>

<style scoped>

</style>
