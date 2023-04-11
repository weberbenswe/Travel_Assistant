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

function getLocationData(callback) {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            callback(position)
        })
    } else {
        console.log('no geolocation data found');
    }
}

async function getPoints(position){
    try {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const weatherPointHome = await fetch('https://api.weather.gov/points/' + latitude + ',' + longitude, {headers :{
            'User-Agent' : '(myweatherapp.com, contact@myweatherapp.com)'
        }});
        console.log(weatherPointHome.forecast)
    }
    catch(error) {
        console.log(error)
    }
}

const button = document.getElementById('button');
button.addEventListener('click', function() {
    getLocationData(getPoints);
})
