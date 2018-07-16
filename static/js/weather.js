cityName = document.getElementById('city')
frmSubmit = document.getElementById('submit')
appId = 'appid=3da34a83f84233570753c27d609311af'
url = 'https://samples.openweathermap.org/data/2.5/weather?q='

frmSubmit.submit(function() {
  $.ajax({
    type: frmSubmit.attr('method'),
    url: url + cityName + '&' + appID,
    data: frmSubmit.serialize(),
    success: function(data) {
      alert('success');
    },
    error: function(data) {
      alert('error');
    }
  })
});
