<template>
  <div>
    <div class="scan-container" v-if="cardIsLoading">
      <v-progress-circular
        :size="90"
        :width="7"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-img
        src="../read_card.png"
        max-height="220"
        max-width="220"
      ></v-img>
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
  computed: {
    ...mapState([
      "cardNumber",
      "modeExamInProgress",
      "cardIsLoading",
      "modeExamRegister"
    ])
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
  methods: {
    ...mapMutations([
        "setCardNumber",
        "setCardIsLoading",
        "setIsRegisteredStudent",
      ]
    ),
    ...mapActions([
        'exam/checkCardForExam',
        'exam/checkRegistForExam',
      ]
    ),
    setFocus() {
      document.getElementById("NFC_CARDNUMBER").focus();
    },

    typeNFC(event) {
      if (event.target.value == "") {
        this.setCardIsLoading(true);
        setTimeout(() => {
          this.checkCard(event.target.value);
        }, 420);
        setTimeout(() => {
          event.target.value = "";
          this.setCardIsLoading(false)
          this.setCardNumber(null)
          this.setIsRegisteredStudent(null)
        }, 5000);
      }
    },

    checkCard(cardnumber) {
      //If exam is in progress right now +-1h
      if (this.modeExamInProgress && !this.modeExamRegister) {
        console.log("exam in progress")
        this['exam/checkRegistForExam'](cardnumber)
      }
      else if(this.modeExamRegister) {
        alert("Funktion fehlt")
      }
      //If no exam (+-1h) found -> Students can check there next exam today
      else {
        console.log("test")
        this['exam/checkCardForExam'](cardnumber)
      }

    }


  }
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
