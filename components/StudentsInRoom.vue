<template>
  <v-container fluid>
    <div v-if="numberOfStudentsPresentInRoom == numberOfStudentsPlannedInRoom">Keine Plätze mehr frei, bitte nutzen Sie
      alternativ:<b> {{
          examRooms
        }}</b></div>
    <div v-else>Raumbelegung: <b>{{ numberOfStudentsPlannedInRoom - numberOfStudentsPresentInRoom }}</b> von
      <b>{{ numberOfStudentsPlannedInRoom }}</b> Plätzen frei
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
