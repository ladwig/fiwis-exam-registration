<template>
  <p v-if="moreInformationMsg">
    {{moreInformationMsg}}
  </p>
  <p v-else>Seit 01.10.2019 gilt die neue APO, hiernach ist für die Teilnahme an einer Prüfung die form- und fristgerechte
    Anmeldung Voraussetzung.</p>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "MoreInformation",
  computed: {
    ...mapState({
      moreInformationMsg: state => state.exam.moreInformationMsg,
    }),
  },
}
</script>

<style scoped>

</style>
