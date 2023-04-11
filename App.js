/*
    Pull weather data
*/

const userAgent = '{User-Agent: (travelAssistantbw.com, benweberswe@gmail.com)}';

async function getWeatherData(){
    try {
        const weatherData = await fetch('https://api.weather.gov/');
        console.log(weatherData);
    }
    catch(error){
        console.log(error);
    }
}

getWeatherData();