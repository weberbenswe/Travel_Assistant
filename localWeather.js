/*
    Pull weather data from weather.gov api
    Based on documentation from: https://www.weather.gov/documentation/services-web-api#/
    Api Callouts: 
                getWeatherFromGridPoints - weather based on 2.5km gridsquares, 
                getBrowserLocation - browser long/lat location
                getGridPoints - gridpoints based on long/lat
*/
const weatherPoints = 'https://api.weather.gov/'
const userAgent = '(myweatherapp.com, contact@myweatherapp.com)'
let weatherData = {}

async function getWeatherFromGridPoints(localData){
    console.log('localData')
    console.log(localData)
    const url = weatherPoints + 'gridpoints/' + localData.properties.cwa + '/' + localData.properties.gridX + ',' + localData.properties.gridY  + '/forecast'
    return new Promise(async (resolve, reject) => {
        try { 
            const weatherData = await fetch(url, { headers :{ 'User-Agent' : userAgent }});
            resolve(weatherData);
        }
        catch(error){
            console.log(error);
            reject(error);
        }
    })
}

function getBrowserLocation(callback) {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async function(position) {
                const result = await callback(position)
                resolve(result)
            })
        } else {
            console.log('no geolocation data found');
            reject('no geolocation data found')
        }

    })
}

async function getGridPoints(position){
    console.log(position)
    try {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const response = await fetch(weatherPoints + 'points/' + latitude + ',' + longitude, {
            headers :{
                'User-Agent' : userAgent
        }});
        const data = await response.json()
        return data
    }
    catch(error) {
        console.log(error)
    }
}
async function pullTodaysForecast() {
    let localData;
    let weather;

    await getBrowserLocation(async function(position) {
        localData = await getGridPoints(position)
    })
    weatherData.location = localData.properties.relativeLocation.properties.city

    const response = await getWeatherFromGridPoints(localData)
    weather = await response.json()
    if(!weather){
        return console.log('Weather could not be obtained for this location')
    }
    console.log('weather')
    console.log(weather)
    const today = weather.properties.periods[0]
    return today
}

function main(todaysInfo){
    const skies = todaysInfo.shortForecast
    const temp = todaysInfo.temperature
    weatherData.Skies = skies
    weatherData.Temperature = temp

    document.querySelector('p:nth-of-type(1)').innerHTML = 'Skies: ' + weatherData.Skies;
    document.querySelector('p:nth-of-type(2)').innerHTML = 'High Temperature: ' + weatherData.Temperature;
    document.querySelector('p:nth-of-type(3)').innerHTML = 'Location: ' + weatherData.location;

    return weatherData
}

window.onload = async function(){
    const todaysInfo = await pullTodaysForecast()
    const today = main(todaysInfo)
    console.log('weather Info')
    console.log(today)
}