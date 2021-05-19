<template>
  <div>
      <v-img
        src="../read_card.png"
        max-height="200"
        max-width="200"
        class="mt-2"
      > </v-img>
      <input v-on:keydown="typeNFC($event)" id="NFC_CARDNUMBER" type="text" autocomplete="off"/>
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
        "setReturnText",
        "setCardIsLoading"
      ]
    ),
    ...mapActions([
        'exam/checkCardForNextExam',
        'exam/cardHandler',
      ]
    ),
    focusCardInput() {
      const cardnumber = document.getElementById("NFC_CARDNUMBER")

      setTimeout(() => {
        cardnumber.readOnly = true
        cardnumber.focus();
      },);

      setTimeout(() => {
        cardnumber.readOnly = false;
      },1)

      cardnumber.onblur = function (event) {
        setTimeout( () => {
          cardnumber.readOnly = true
          cardnumber.focus();
        },)
        setTimeout(() => {
          cardnumber.readOnly = false;
        },1)
      }
    },

    typeNFC(event) {
      if (event.target.value == "") {
        setTimeout(() => {
          this.setCardNumber(event.target.value)
          this.checkCard(event.target.value);
        }, 420)
        this.setCardIsLoading(true)
        setTimeout(() => {
          event.target.value = "";
        }, 3000);
      }
    },

    checkCard(cardnumber) {
      console.log(cardnumber)
      //If no exam (+-1h) found -> Students can check there next exam today
      if (!this.modeExamInProgress) {
        this['exam/checkCardForNextExam'](cardnumber)
      }
      //If exam is in progress right now +-1h
      else {
        this['exam/cardHandler']([cardnumber])
      }
    },

  },
  mounted() {
    this.focusCardInput()
  },
}
</script>

<style scoped>
#NFC_CARDNUMBER {
  opacity: 0;
  height: 0;
  width: 0;
}

</style>
