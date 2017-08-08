window.onload = function () {
  var resultText = document.getElementById('result');
  var loading = document.getElementById('loading');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var lon = position.coords.longitude
      var lat = position.coords.latitude

      var ourRequest = new XMLHttpRequest()

      ourRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=ce7c491ebdbd0140c3eb50ac39580d4e&units=metric')

      ourRequest.onload = () => {
        var ourData = JSON.parse(ourRequest.responseText)
        renderHTML(ourData)
        styling(ourData)
      }

      ourRequest.send()
    }, function(error) {
      resultText.innerHTML = '<h3>This is strange, we are unable to retrieve your location.</h3> \n Try refreshing your browser and make sure your location services are turned on.'
      loading.className = 'hide';
    })
  }

  function renderHTML (data) {
    resultText.innerHTML = 'There is <b>' + data.weather[0].main.toLowerCase() + '</b>, and the temperature is: <b>' + data.main.temp + '°C </b> in <b>' + data.name + '</b>.';
    loading.className = 'hide';
  }

  function styling (data) {
    var weather = 'clear sky';
    //var weather = data.weather[0].main.toLowerCase();
    var icon = document.getElementById('icon');
    var body = document.body;

    if (weather == 'clear sky') {
      icon.className = 'em em-sunny';
      body.style.backgroundColor = '#FEDCCC';

    } else if (weather == 'shower rain' || weather == 'rain') {
      icon.className = 'em em-droplet';
      body.style.backgroundColor = 'rgb(186,225,232)';
    } else if (weather == 'thunderstorm') {
      icon.className = 'em em-zap';
      body.style.backgroundColor = 'rgb(242,207,100)';
    } else if (weather == 'snow') {
      icon.className = 'em em-snowflake';
      body.style.backgroundColor = '#FFFDE7'
    }
  }

}
