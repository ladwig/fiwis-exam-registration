<!-- Imports the rooms state to show a list of possible rooms at start -->
<template>
  <v-container>
    <h3>{{ $t('setExamRoom.pleaseSelectRoom') }}</h3>
    <v-row>
      <v-col
        v-for="room in rooms"
        :key="room.name"
        :cols=3
      >
        <v-card
          @click="setRoomName(room.name)"
          flat
          outlined
          class="d-flex justify-center mb-3">
          <v-card-title v-text="room.name"></v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapMutations, mapState} from "vuex";
export default {
  name: "SetExamRoom",
  computed: {
    ...mapState({
      rooms: state => state.rooms.rooms,
    }),
    ...mapState([
      "roomName"
    ])
  },
  methods: {
    ...mapMutations(["setRoomName"]),
  },
}
</script>
