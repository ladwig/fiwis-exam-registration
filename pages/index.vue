<template>
  <v-container fluid class="ma-0 pa-0">

    <!-- Registierung eines Raumes, Startseite -->
    <set-exam-room v-if="roomName===null"></set-exam-room>

    <!-- Display, wenn Raum ausgewählt -->
    <v-row v-if="roomName!=null">
      <!-- linke, große Spalte -->
      <v-col cols="8" align="left" class="pa-5">
        <current-exam-time v-if="examInProgress"></current-exam-time>
        <current-exam-name></current-exam-name>
        <v-divider></v-divider>
        <next-exam-info v-if="!examInProgress"></next-exam-info>
      </v-col>

      <!-- rechte, kleine Spalte -->
      <v-col cols="4" class="test pa-5">
        <students-in-room v-if="examInProgress"></students-in-room>
        <more-information></more-information>
        <display-clock></display-clock>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SetExamRoom from "../components/SetExamRoom";
import {mapState} from "vuex";
import CurrentExamName from "../components/CurrentExamName";
import NextExamInfo from "../components/NextExamInfo";
import CurrentExamTime from "../components/CurrentExamTime";
import MoreInformation from "../components/MoreInformation";
import DisplayClock from "../components/DisplayClock";
import StudentsInRoom from "../components/StudentsInRoom";

export default {
  components: {
    StudentsInRoom,
    DisplayClock, MoreInformation, CurrentExamTime, NextExamInfo, CurrentExamName, SetExamRoom
  },
  computed: {
    ...mapState([
      "roomName",
      "examInProgress"
    ])
  },
}

</script>
<style scoped>
.test {
  background: lightgray;
}
</style>
