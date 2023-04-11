/*
    Pull weather data
*/
async function getWeatherData(){
    try {
        const weatherData = await fetch('https://api.weather.gov/', {headers :{
            'User-Agent': '(myweatherapp.com, contact@myweatherapp.com)'
    }});
        console.log(weatherData);
    }
    catch(error){
        console.log(error);
    }
}

function getLocationData() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude)
            console.log(longitude)
        })
    } else {
        console.log('no geolocation data found')
    }
}

const button = document.getElementById('button');
button.addEventListener('click', function() {
    getLocationData();
})
