<template>
  <v-container fluid class="ma-0 pa-0 full">
    <!-- Registierung eines Raumes, Startseite -->
    <set-exam-room v-if="roomName===null"></set-exam-room>

    <!-- Display, wenn Raum ausgewählt -->
    <v-row class="full" v-if="roomName!=null">
      <!-- linke, große Spalte -->
      <v-col cols="8" align="left" class="pa-10">
        <v-container fill-height>
          <v-row align="center" justify="center">
            <current-exam-time v-if="examInProgress"></current-exam-time>
            <current-exam-name></current-exam-name>
            <next-exam-info v-if="!examInProgress"></next-exam-info>
          </v-row>
        </v-container>
      </v-col>

      <!-- rechte, kleine Spalte -->
      <v-col cols="4" class="right pa-5">
        <students-in-room v-if="examInProgress"></students-in-room>
        <v-divider></v-divider>
        <more-information></more-information>
        <v-divider></v-divider>
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
<style>
.right {
  background: #f5f5f5;
}

.full {
  height: 100%;
}
</style>
