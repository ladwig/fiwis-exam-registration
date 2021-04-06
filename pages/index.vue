<template>
  <v-container fluid>
    <set-exam-room v-if="roomName===null"></set-exam-room>
    <v-row v-if="roomName!=null">
      <v-col cols="10" align="center">
        <display-exam-name></display-exam-name>
        <next-exam-info v-if="!examInProgress"></next-exam-info>
      </v-col>
      <v-col cols="2">hha</v-col>
    </v-row>
  </v-container>
</template>

<script>
import SetExamRoom from "../components/SetExamRoom";
import {mapState} from "vuex";
import DisplayExamName from "../components/DisplayExamName";
import NextExamInfo from "../components/NextExamInfo";

export default {
  components: {NextExamInfo, DisplayExamName, SetExamRoom},
  computed: {
    ...mapState([
      "roomName",
      "examInProgress"
    ])
  },
}

</script>
