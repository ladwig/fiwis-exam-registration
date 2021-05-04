<template>
  <v-container fluid>
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
      numberOfStudentsPlannedInRoom: 70,
      numberOfStudentsPresentInRoom: 31,
      roomFull: false,
    }
  },
  computed: {
    ...mapState({
      examRooms: state => state.exam.examRooms
    })
  },
}
</script>

<style scoped>

</style>
