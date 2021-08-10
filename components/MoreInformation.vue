<!-- Can be used to display additional information about current exam -->
<template>
  <p v-if="moreInformationMsg">
    {{moreInformationMsg}}
  </p>
  <p v-else>
    {{ $t('moreInformationStandardText') }}
  </p>
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
