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

const button = document.getElementById('button');
button.addEventListener('click', function() {
    getWeatherData();
})
