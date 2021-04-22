<template>
  <v-container fluid class="ma-0 pa-0 full">
    <!-- Select a room, first page -->
    <set-exam-room v-if="roomName===null"></set-exam-room>

    <!-- Popup to ask for exam start -->
    <start-exam-register-alert v-if="isExaminer"></start-exam-register-alert>
    <!-- Screen when room has been selected  -->
    <v-row class="full" v-if="roomName!=null">
      <!-- left, big col -->
      <v-col cols="8" class="pa-10">
        <v-container style="margin-top: 30vh">
          <v-row>
            <current-exam-time v-if="modeExamInProgress"></current-exam-time>
          </v-row>
          <v-row>
            <current-exam-name></current-exam-name>
          </v-row>
          <v-row>
            <next-exam-info v-if="!modeExamInProgress"></next-exam-info>
          </v-row>
          <v-row>
            <current-exam-info v-if="modeExamInProgress"></current-exam-info>
          </v-row>
          <v-row>
            <card-reader></card-reader>
          </v-row>
        </v-container>
      </v-col>

      <!-- right, small col -->
      <v-col cols="4" class="right pa-5">
        <students-in-room v-if="modeExamInProgress"></students-in-room>
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
import CurrentExamInfo from "../components/CurrentExamInfo";
import CardReader from "../components/CardReader";
import StartExamRegisterAlert from "../components/StartExamRegisterAlert";

export default {
  components: {
    StartExamRegisterAlert,
    CardReader,
    CurrentExamInfo,
    StudentsInRoom,
    DisplayClock, MoreInformation, CurrentExamTime, NextExamInfo, CurrentExamName, SetExamRoom
  },
  computed: {
    ...mapState([
      "roomName",
      "modeExamInProgress",
      "isExaminer"
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
