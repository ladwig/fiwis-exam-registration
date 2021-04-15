<template>
  <div v-if="modeExamRegister">
    <h4 class="display-1 primary--text">Jetzt zur Prüfung anmelden</h4>
    <p>Beim Scannen Ihres Ausweises bestätigen Sie die Teilnahme an der Prüfung!</p>
  </div>
  <div v-else>
    <h4 class="display-1 primary--text">Anmeldung prüfen</h4>
    <p>Scannen Sie Ihren Ausweis, um zu prüfen, ob Sie für diese Prüfung angemeldet sind.</p>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CurrentExamInfo",
  computed: {
    ...mapState({
      examName: state => state.exam.examName,
    }),
    ...mapState([
      "modeExamRegister",
    ]),
  },

  methods: {},
  created() {

  }

}
</script>

<style scoped>

</style>
