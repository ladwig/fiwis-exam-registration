<template>
  <v-container>
 asd
  </v-container>

</template>

<script>
import SetExamRoom from "../components/SetExamRoom";
import {mapActions} from "vuex";
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

export default {
  components: {
    ProgressBar,
    ErrorMessageAlert,
    SettingsAlert,
    CardReader,
    CurrentExamInfo,
    StudentsInRoom,
    DisplayClock, MoreInformation, CurrentExamTime, NextExamInfo, CurrentExamName, SetExamRoom
  },
  computed: {

  },
  methods: {
    cardNum2String(cardnumber) {
      const converter = require('hex2dec');
      const test = cardnumber
        .match(/.{1,2}/g)
        .reverse()
        .join("")
      return String(
        converter.hexToDec(test, 16)
      )
    }
  },
  created() {
    console.log(this.cardNum2String("0477591a1f5b80"))
  }
}
</script>
<style>
input {
  border: 1px solid black;
}


</style>
converter.hexToDec(
cardnumber
.match(/.{1,2}/g)
.reverse()
.join(""),
16
)
