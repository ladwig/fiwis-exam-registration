<template>
  <v-container>
 asd
  </v-container>

</template>

<script>
import SetExamRoom from "../components/SetExamRoom";
import {mapState} from "vuex";
import CurrentExamName from "../components/CurrentExamName";
import NextExamInfo from "../components/NextExamInfo";
import CurrentExamTime from "../components/CurrentExamTime";
import MoreInformation from "../components/MoreInformation";
import DisplayClock from "../components/DisplayClock";
import StudentsInRoom from "../components/StudentsInRoom";
import CurrentExamInfo from "../components/CurrentExamInfo";
import CardReader from "../components/CardReader";
import SettingsAlert from "../components/SettingsAlert";
import ErrorMessageAlert from "../components/ErrorMessageAlert";
import ProgressBar from "../components/ProgressBar";

export default {
  components: {
    ProgressBar,
    ErrorMessageAlert,
    SettingsAlert,
    CardReader,
    CurrentExamInfo,
    StudentsInRoom,
    DisplayClock, MoreInformation, CurrentExamTime, NextExamInfo, CurrentExamName, SetExamRoom
  },
  computed: {
    ...mapState([

    ])
  },
mounted() {
    //this.test()
},
/*  methods: {

    colorTest() {
      const colors = ["#00ff00","#0000ff","#ff000f", "#ff0fff", "#ffff0f","#0fffff"]
      const color = colors[Math.floor(Math.random() * colors.length)]
      var access = new function() {
        this.ip = 'localhost';
        //this.ip = '192.168.1.162';
        this.api_base = 'http://' + this.ip + ':8080/v2';

        this.token = '';
      }
        changeLedColor(color)
        function changeLedColor(hex) {
          var xhr = new XMLHttpRequest(),
            data = {
              id: 0,
              name: 'frame',
              brightness: 1.0,
              color: hex
            },
            data_string = '';
          for (var key in data) {
            data_string += '&'+key+(data[key] ?'='+data[key] :'');
          }
          xhr.open('POST', access.api_base+'/hardware/light?access_token='+access.token, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
              if (this.status != 200) {
                alert('some errors color');
              }
            }
          }
          xhr.send(data_string);
        }
    },


  }*/
}
</script>
<style>
input {
  border: 1px solid black;
}


</style>
