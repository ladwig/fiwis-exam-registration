<template>
  <v-container fluid pa-0 class="d-flex flex-column flex-grow-1 fill-parent-height pa-0">
    <!-- Select a room, first page -->
    <set-exam-room v-if="roomName===null"></set-exam-room>

    <!-- Popup to ask for exam start and settings -->
    <settings-alert v-if="isExaminer"></settings-alert>

    <!-- Popup when there is an error -->
    <error-message-alert v-if="errorMessage.error"></error-message-alert>

    <v-row v-if="roomName!=null" no-gutters class="top-row flex-grow-1 flex-shrink-1">
      <v-col cols="12" class="grid-item-mid fill-parent-height pa-5" >

        <current-exam-name></current-exam-name>
        <current-exam-time v-if="modeExamInProgress"></current-exam-time>
        <next-exam-info v-if="!modeExamInProgress"></next-exam-info>
        <current-exam-info v-if="modeExamInProgress"></current-exam-info>
        <students-in-room v-if="modeExamInProgress"></students-in-room>
      </v-col>
    </v-row>
    <v-row v-if="roomName!=null" no-gutters class="bottom-row flex-grow-0 flex-shrink-0">
      <v-col cols="12" class="grid-item-bottom">
        <card-reader></card-reader>
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
import SettingsAlert from "../components/SettingsAlert";
import ErrorMessageAlert from "../components/ErrorMessageAlert";

export default {
  components: {
    ErrorMessageAlert,
    SettingsAlert,
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
.grid-item-mid {
  color: var(--v-light-base);
  background-color: var(--v-primary-lighten2);
}


.grid-item-bottom {
  background-color: var(--v-secondary-base);

}

.fill-parent-height {
  height: 100%;
}

.top-row{
  min-height: 0;
}

</style>
