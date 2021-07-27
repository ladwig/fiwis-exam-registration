// Using the XDS-1008-A device API to change it's LED color. Used to give feedback / status of scanned card
// #000000 to turn LEDs off
export function changeLEDColor(hex) {
  if(/Android|webOS/i.test(navigator.userAgent)) {
    const access = {
      base: 'http://localhost:8080/v2',
      token: ''
    }
    const xhr = new XMLHttpRequest()
    const data = {
      id: 0,
      name: 'frame',
      brightness: 1.0,
      color: hex
    }
    let data_string = '';
    for (let key in data) {
      data_string += '&' + key + (data[key] ? '=' + data[key] : '');
    }
    xhr.open('POST', access.base + '/hardware/light?access_token=' + access.token, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) {
          alert("LED lights error (ledAPI.js): " + this.status);
        }
      }
    }
    xhr.send(data_string);
  }
}
