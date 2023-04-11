/*
    Pull weather data
*/

const userAgent = '{User-Agent: (travelAssistantbw.com, benweberswe@gmail.com)}';

async function getWeatherData(){
    try {
        const weatherData = await fetch('https://api.weather.gov/', {headers :{
            'User-Agent': '(myweatherapp.com, contact@myweatherapp.com)'
    }});
        console.log(weatherData);
        console.log(weatherData.headers)
    }
    catch(error){
        console.log(error);
    }
}

getWeatherData();