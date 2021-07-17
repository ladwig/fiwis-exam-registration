<template>
  <v-container class="pa-0 ma-0 headline font-weight-regular">
    <div v-if="freeSeats <= 0">
      {{ $t('studentsInRoom.noSeats') }}
      <strong>
        {{ examRooms }}
      </strong>
    </div>
    <div v-else>
      {{ $t('studentsInRoom.roomOccupation') }}
      <strong>
        {{ freeSeats }}
      </strong> {{ $t('studentsInRoom.connective') }}
      <strong>
        {{ numberOfStudentsPlannedInRoom }}
      </strong> {{ $t('studentsInRoom.freeSeats') }}
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapState, mapGetters} from "vuex";

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
    }),
    ...mapGetters({
      freeSeats: "exam/getFreeSeats"
    })
  },
  methods: {
    ...mapActions([
      "exam/updateNumberOfStudentsInRoom",
    ]),
  },
  created() {
    this['exam/updateNumberOfStudentsInRoom']()
  }
}
</script>

<style scoped>

</style>
