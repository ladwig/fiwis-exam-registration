<template>
  <div v-if="cardIsLoading && (isRegisteredStudent != null) && (isRegisteredStudent || !isRegisteredStudent)">
    <div v-if="isRegisteredStudent">
      <h4 class="display-1 primary--text">Sie sind angemeldet!</h4>
      <p>Es liegt eine Anmeldung für diese Prüfung vor. Bestätigen Sie vor Prüfungsbeginn Ihre Anwesenheit.</p>
    </div>
    <div v-else>
      <h4 class="display-1 primary--text">Sie sind nicht angemeldet!</h4>
      <p>Es liegt keine Anmeldung für diese Prüfung vor. Bei Unklarheiten wenden Sie sich bitte an einen Mitarbeitenden der Hochschule.</p>
    </div>
  </div>
  <div v-else>
    <div v-if="modeExamRegister">
    <h4 class="display-1 primary--text">Jetzt zur Prüfung anmelden</h4>
    <p>Beim Scannen Ihres Ausweises bestätigen Sie die Teilnahme an der Prüfung!</p>
  </div>
    <div v-else>
      <h4 class="display-1 primary--text">Anmeldung prüfen</h4>
      <p>Scannen Sie Ihren Ausweis, um zu prüfen, ob Sie für diese Prüfung angemeldet sind.</p>
    </div></div>
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
      "isRegisteredStudent",
      "cardIsLoading"
    ]),
  },

  methods: {},
  created() {

  }

}
</script>

<style scoped>

</style>
