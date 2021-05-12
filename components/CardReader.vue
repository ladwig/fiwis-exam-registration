<template>
  <div>
    <div class="scan-container" v-if="this.cardIsLoading">
      <v-progress-circular
        :size="150"
        :width="7"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-img
        src="../read_card.png"
        max-height="200"
        max-width="200"
      > </v-img>
    </div>
    <div>
      <input v-on:keydown="typeNFC($event)" id="NFC_CARDNUMBER" type="text" autocomplete="off"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "CardReader",
  data () {
    return {
      cardIsLoading: false,
    }
  },
  computed: {
    ...mapState([
      "cardNumber",
      "modeExamInProgress",
      "modeExamRegister",
      "returnText"
    ])
  },
  methods: {
    ...mapMutations([
        "setCardNumber",
        "setIsRegisteredStudent",
        "setReturnText"
      ]
    ),
    ...mapActions([
        'exam/checkCardForNextExam',
        'exam/cardHandler',
      ]
    ),
    setFocus() {
      document.getElementById("NFC_CARDNUMBER").focus();
    },

    typeNFC(event) {
      if (event.target.value == "") {
        setTimeout(() => {
          this.checkCard(event.target.value);
        }, 420)
       this.cardIsLoading = true;
        setTimeout(() => {
          event.target.value = "";
          this.cardIsLoading = false
          this.setReturnText(null)
          this.setCardNumber(null)
          this.setIsRegisteredStudent(null)
        }, 5000);
      }
    },

    checkCard(cardnumber) {
      //If no exam (+-1h) found -> Students can check there next exam today
      if (!this.modeExamInProgress) {
        this['exam/checkCardForNextExam'](cardnumber)
      }
      //If exam is in progress right now +-1h
      else {
        this['exam/cardHandler']([cardnumber])
      }

    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementById("NFC_CARDNUMBER").focus();
    }, 1);
    document.getElementById("NFC_CARDNUMBER").onblur = () => {
      setTimeout(() => {
        document.getElementById("NFC_CARDNUMBER").focus();
      }, 1);
    };
  },
}
</script>

<style scoped>
#NFC_CARDNUMBER {
  opacity: 0;
  height: 0;
  width: 0;
}

scan-container {
  height: 10vh;
}
</style>
