<template>
  <div>
    <v-img

      src="../read_card.png"
      max-height="220"
      max-width="220"
    ></v-img>
    <div>
      <input v-on:keydown="typeNFC($event)" id="NFC_CARDNUMBER" type="text" autocomplete="off"/>
    </div>
  </div>

</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  data() {
    return {
      componentKey: 0,
    }
  },
  name: "CardReader",
  computed: {
    ...mapState([
      "cardNumber"
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
    ...mapMutations(["setCardNumber"]),
    setFocus() {
      document.getElementById("NFC_CARDNUMBER").focus();
    },

    typeNFC(event) {
      if (event.target.value === "") {
        setTimeout(() => {
          this.setCardNumber(event.target.value);
        }, 420);
        setTimeout(() => {
          console.log(event.target.value)
          event.target.value = "";
        }, 4000);
      }
    }
  }
}
</script>

<style scoped>

</style>
