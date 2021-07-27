<!-- Central component that implements the input field for the card reader. img src static src as a workaround
for 404 in fiwis production env" -->
<template>
  <div>
      <v-img
        src="https://raw.githubusercontent.com/ladwig/fiwis-exam-registration/master/static/read_card.png"
        max-height="210"
        max-width="210"
        class="mt-2"
      > </v-img>
      <input @keydown="typeNFC" id="NFC_CARDNUMBER" type="text" autocomplete="off"/>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "CardReader",
  methods: {
    ...mapMutations([
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
