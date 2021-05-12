<template>
  <div v-if="cardNumber != null">
    {{    console.log(cardNumber) }}
    <div v-if="isRegisteredStudent">
      <h4 class="display-1 primary--text">{{ $t('currentExamInfo.isRegisteredStudentHeadline') }}</h4>
      <p>{{ $t('currentExamInfo.isRegisteredStudentMore') }}</p>
    </div>
    <div v-else>
      <h4 class="display-1 primary--text">{{ $t('currentExamInfo.isNotRegisteredStudentHeadline') }}</h4>
      <p>{{ $t('currentExamInfo.isNotRegisteredStudentMore') }}</p>
    </div>
  </div>
  <div v-else>
    <div v-if="modeExamRegister">
    <h4 class="display-1 primary--text">{{ $t('currentExamInfo.registerForExamNowHeadline') }}</h4>
    <p>{{ $t('currentExamInfo.registerForExamNowMore') }}</p>
  </div>
    <div v-else>
      <h4 class="display-1 primary--text">{{ $t('currentExamInfo.checkStatusHeadline') }}</h4>
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
      "cardNumber"
    ]),
  },

  methods: {},
  created() {

  }

}
</script>

<style scoped>

</style>
