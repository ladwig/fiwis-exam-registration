<template>
  <v-container fluid>
    <set-exam-room v-if="roomName===null"></set-exam-room>
    <v-row v-if="roomName!=null">
      <v-col>
        <display-exam-name></display-exam-name>
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

export default {
  components: {DisplayExamName, DisplayRoomTest, SetExamRoom},
  computed: {
    ...mapState([
      "roomName"
    ])
  },
}

</script>
