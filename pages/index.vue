<template>
  <v-container fluid>
    <set-exam-room v-if="roomName===null"></set-exam-room>
    <v-row v-if="roomName!=null">
      <v-col>
        <display-exam-name></display-exam-name>
        <next-exam-info v-if!="examInProgress"></next-exam-info>
      </v-col>
      <v-col>hha</v-col>
    </v-row>
    <display-room-test></display-room-test>
  </v-container>
</template>

<script>
import SetExamRoom from "../components/SetExamRoom";
import DisplayRoomTest from "../components/DisplayRoomTest";
import {mapState} from "vuex";
import DisplayExamName from "../components/DisplayExamName";
import NextExamInfo from "../components/NextExamInfo";

export default {
  components: {NextExamInfo, DisplayExamName, DisplayRoomTest, SetExamRoom},
  computed: {
    ...mapState([
      "roomName",
      "examInProgress"
    ])
  },
}

</script>
