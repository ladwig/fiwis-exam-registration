<template>
  <v-container class="pa-0 ma-0 headline">
    <div v-if="numberOfStudentsPresentInRoom == numberOfStudentsPlannedInRoom">
      {{ $t('studentsInRoom.noSeats') }}<b> {{
        examRooms
      }}</b></div>
    <div v-else>{{ $t('studentsInRoom.roomOccupation') }} <b>{{ numberOfStudentsPlannedInRoom - numberOfStudentsPresentInRoom }}</b> {{ $t('studentsInRoom.connective') }}
      <b>{{ numberOfStudentsPlannedInRoom }}</b> {{ $t('studentsInRoom.freeSeats') }}
    </div>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "StudentsInRoom",
  data() {
    return {
      roomFull: false,
    }
  },
  computed: {
    ...mapState({
      examRooms: state => state.exam.examRooms,
      numberOfStudentsPlannedInRoom: state => state.exam.numberOfStudentsPlannedInRoom,
      numberOfStudentsPresentInRoom: state => state.exam.numberOfStudentsPresentInRoom
    })
  },
  created() {
    this.$store.dispatch("exam/checkNumberOfStudentsInRoom")
  }
}
</script>

<style scoped>

</style>
