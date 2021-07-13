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
  computed: {
    ...mapState([
      "currentCard/cardNumber",
      "modeExamInProgress",
      "modeExamRegister",
      "currentCard/returnText"
    ])
  },
  methods: {
    ...mapMutations([
        "currentCard/setCardNumber",
        "setCardIsLoading"
      ]
    ),
    ...mapActions([
      "currentCard/checkCard"
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
          this['currentCard/checkCard'](event.target.value)
        }, 420)
        this.setCardIsLoading(true)
        setTimeout(() => {
          event.target.value = "";
        }, 3000);
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
