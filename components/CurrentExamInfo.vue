<template>
    <div v-if="modeExamRegister">
    <h2 class="display-2 primary--text font-weight-light">{{ $t('currentExamInfo.registerForExamNowHeadline') }}</h2>
      <p v-if="returnText">{{this.returnText}}</p>
      <p v-else>{{ $t('currentExamInfo.registerForExamNowMore') }}</p>
  </div>
    <div v-else>
      <h2 class="display-2 primary--text font-weight-light">{{ $t('currentExamInfo.checkStatusHeadline') }}</h2>
      <p v-if="returnText">{{this.returnText}}</p>
      <p v-else>{{ $t('currentExamInfo.checkStatusMore') }}</p>
    </div>
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
