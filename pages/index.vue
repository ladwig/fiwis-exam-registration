<template>
  <v-container fluid class="d-flex flex-column flex-grow-1 fill-parent-height pa-0">

    <!-- Select a room, first page -->
    <set-exam-room v-if="roomName===null"></set-exam-room>

    <!-- Popup to ask for exam start and settings -->
    <settings-alert v-if="this.isExaminer" :mode-exam-register="modeExamRegister"></settings-alert>

    <!-- Popup when there is an error -->
    <error-message-alert v-if="errorMessage"></error-message-alert>

    <v-row v-if="roomName!=null" no-gutters class="top-row flex-grow-1 flex-shrink-1">

      <v-col cols="11" class="grid-item-mid fill-parent-height pa-0 pl-10 pt-15">

        <!-- Name of exam or no exam text -->
        <current-exam-name></current-exam-name>

        <!-- Time of exam and warning when exam in progress -->
        <current-exam-time v-if="modeExamInProgress" class="mt-5"></current-exam-time>

        <!-- Current number of studends in room and room full warning -->
        <students-in-room v-if="modeExamRegister && modeExamInProgress" class="mt-5"></students-in-room>
      </v-col>
    </v-row>
    <v-row v-if="roomName!=null" no-gutters class="bottom-row flex-grow-0 flex-shrink-0 pb-3 grid-item-bottom">
      <v-col cols="12">

        <!-- Shows loading status when card is scanned -->
        <progress-bar :loading="cardIsLoading" :status="status"></progress-bar>
      </v-col>
      <v-col cols="3" class="pl-10">

        <!-- Manages card scans and shows card image -->
        <card-reader></card-reader>
      </v-col>
      <v-col cols="9">

        <!-- Shows next exam for scanned card -->
        <next-exam-info v-if="!modeExamInProgress" class="mt-2 ml-10"></next-exam-info>


        <!-- Shows return text for scanned card -->
        <current-exam-info v-if="modeExamInProgress" :registModeActive="modeExamRegister" class="mt-2 ml-10"></current-exam-info>
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
import ProgressBar from "../components/ProgressBar";
import { changeColor } from "../ledAPI";

export default {
  components: {
    ProgressBar,
    ErrorMessageAlert,
    SettingsAlert,
    CardReader,
    CurrentExamInfo,
    StudentsInRoom,
    MoreInformation,
    CurrentExamTime,
    NextExamInfo,
    CurrentExamName,
    SetExamRoom
  },
  computed: {
    ...mapState([
      "roomName",
      "modeExamInProgress",
      "modeExamRegister",
      "errorMessage",
      "modeExamRegister",
      "cardIsLoading",
    ]),
    ...mapState({
      isExaminer: state => state.currentCard.isExaminer,
      status: state => state.currentCard.status
    }),
  },
  created() {
    changeColor("#ffffff")
  }

}

</script>
<style>
.grid-item-mid {
  color: var(--v-light-base);
}

.grid-item-bottom {
  background-color: var(--v-secondary-base);
}

.fill-parent-height {
  height: 100%;
}

.top-row {
  min-height: 0;
  background-color: var(--v-primary-lighten2);
}



</style>
