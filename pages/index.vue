<template>
  <v-container fluid class="d-flex flex-column flex-grow-1 fill-parent-height pa-0">

    <!-- Select a room, first page -->
    <set-exam-room v-if="roomName===null"></set-exam-room>

    <!-- Popup to ask for exam start and settings -->
    <settings-alert v-if="isExaminer" :mode-exam-register="modeExamRegister"></settings-alert>

    <!-- Popup when there is an error -->
    <error-message-alert v-if="errorMessage"></error-message-alert>

    <!-- Popup test -->

    <current-exam-response-dialog :dialog="currentExamDialog" :status="status" :return-text="returnText"></current-exam-response-dialog>
    <next-exam-response-dialog :dialog="nextExamDialog" :status="status"></next-exam-response-dialog>
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

        <information-panel :exam-in-progress-mode="modeExamInProgress" :regist-mode-active="modeExamRegister" class="mt-2 ml-10"></information-panel>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {mapState} from "vuex";
import { changeColor } from "../ledAPI";
import SetExamRoom from "../components/SetExamRoom";
import CurrentExamName from "../components/CurrentExamName";
import CurrentExamTime from "../components/CurrentExamTime";
import StudentsInRoom from "../components/StudentsInRoom";
import CardReader from "../components/CardReader";
import SettingsAlert from "../components/SettingsAlert";
import ErrorMessageAlert from "../components/ErrorMessageAlert";
import ProgressBar from "../components/ProgressBar";
import InformationPanel from "../components/InformationPanel";
import NextExamResponseDialog from "../components/NextExamResponseDialog";
import CurrentExamResponseDialog from "../components/CurrentExamResponseDialog";
export default {
  components: {
    CurrentExamResponseDialog,
    NextExamResponseDialog,
    InformationPanel,
    ProgressBar,
    ErrorMessageAlert,
    SettingsAlert,
    CardReader,
    StudentsInRoom,
    CurrentExamTime,
    CurrentExamName,
    SetExamRoom
  },
  computed: {
    ...mapState([
      "roomName",
      "modeExamInProgress",
      "errorMessage",
      "modeExamRegister",
      "cardIsLoading",
      "infoDialogStatus"
    ]),
    ...mapState({
      isExaminer: state => state.currentCard.isExaminer,
      status: state => state.currentCard.status,
      returnText: state => state.currentCard.returnText,
    }),
    currentExamDialog() {
      if(this.infoDialogStatus && !this.isExaminer && this.returnText && this.modeExamInProgress) {
        return true
      }
      return false
    },
    nextExamDialog() {
     if(this.infoDialogStatus && !this.isExaminer && !this.modeExamInProgress){
        return true
      }
     return false
    }
  },
  created() {
    changeColor("#ffffff")
    console.log(process.env.BABEL_ENV)
  }

}

</script>
<style>
.grid-item-mid {
  color: var(--v-light-base);
}

.grid-item-bottom {
  background-color: var(--v-secondary-base);
  z-index: 10;
}

.fill-parent-height {
  height: 100%;
}

.top-row {
  min-height: 0;
  background-color: var(--v-primary-lighten2);
}

.top-row:before{
  content: "";
  background-size: auto;
  position: absolute;
  top: 0px;
  right: 0;
  bottom: 0px;
  left: 0px;
  opacity: 0.06;
  background: url("~assets/images/logo.png");
}



</style>
