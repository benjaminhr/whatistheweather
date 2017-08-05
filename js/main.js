window.onload = function () {
  var resultText = document.getElementById('result');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var lon = position.coords.longitude
      var lat = position.coords.latitude

      var ourRequest = new XMLHttpRequest()

      ourRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=ce7c491ebdbd0140c3eb50ac39580d4e&units=metric')

      ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText)
        renderHTML(ourData)
        console.log(ourData)
      }

      ourRequest.send()
    }, function(error) {
      resultText.innerHTML = '<h3>That is strange, we are unable to retrieve your location.</h3> \n Try refreshing your browser and make sure your location services are turned on.'
    })
  }

  function renderHTML (data) {
    resultText.innerHTML = 'There is <b>' + data.weather[0].main.toLowerCase() + '</b>, and the temperature is: <b>' + data.main.temp + '°C </b> in <b>' + data.name + '</b>.';
  }
}
