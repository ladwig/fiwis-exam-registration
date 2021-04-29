<template>
  <v-container fluid class="ma-0 pa-0 full">
    <!-- Select a room, first page -->
    <set-exam-room v-if="roomName===null"></set-exam-room>

    <!-- Popup to ask for exam start -->
    <start-exam-register-alert v-if="isExaminer && !modeExamRegister"></start-exam-register-alert>

    <!-- Popup when there is an eror -->
    <error-message-alert v-if="errorMessage.error"></error-message-alert>
    <!-- Screen when room has been selected  -->
    <v-row class="full" v-if="roomName!=null">
      <!-- Left, big col -->
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
        </v-container>
      </v-col>

      <!-- Right, small col -->
      <v-col cols="4" class="right pa-5">
        <v-container>
         <v-row>
          <students-in-room v-if="modeExamInProgress"></students-in-room>
         </v-row>
          <v-row>
            <more-information></more-information>
          </v-row>
          <v-row>
            <display-clock></display-clock>
          </v-row>
          <v-row justify="end">
            <card-reader style="position: absolute; bottom: 0"></card-reader>
          </v-row>
        </v-container>
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
import ErrorMessageAlert from "../components/ErrorMessageAlert";

export default {
  components: {
    ErrorMessageAlert,
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
      "isExaminer",
      "modeExamRegister",
      "errorMessage",
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
