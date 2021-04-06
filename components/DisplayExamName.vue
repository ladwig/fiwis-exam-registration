<template>
  <v-container>
    {{ examName }}
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "DisplayExamName",
  computed: {
    ...mapState({
      examName: state => state.exam.examName
    })
  },

}
</script>

<style scoped>

</style>
