<template>
  <v-container fluid>
    <set-exam-room v-if="roomName===null"></set-exam-room>
    <v-row>
      <v-col>hihi</v-col>
      <v-col>hha</v-col>
    </v-row>
    <display-room-test></display-room-test>
  </v-container>
</template>

<script>
import SetExamRoom from "../components/SetExamRoom";
import DisplayRoomTest from "../components/DisplayRoomTest";
import {mapState} from "vuex";

export default {
  components: {DisplayRoomTest, SetExamRoom},
  computed: {
    ...mapState([
      "roomName"
    ])
  },
}

</script>
