/*
    Pull weather data from weather.gov api
    Based on documentation from: https://www.weather.gov/documentation/services-web-api#/
    Api Callouts: 
                getWeatherFromGridPoints - weather based on 2.5km gridsquares, 
                getBrowserLocation - browser long/lat location
                getGridPoints - gridpoints based on long/lat
*/
const weatherApiBase = 'https://api.weather.gov/'
const userAgent = '(myweatherapp.com, contact@myweatherapp.com)'

let weatherData = {}

/**
 * 
 * @param {*} callback placeholder for callback method to find gridpoints
 * @returns resolves into local browser position and callback to find gridpoints
 */
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

/**
 * 
 * @param {*} position broswer longitude/latitude
 * @returns grid data based on 2.5km squares required in weather callout
 */
async function getGridPoints(position){
    console.log(position)
    try {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const response = await fetch(weatherApiBase + 'points/' + latitude + ',' + longitude, {
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

/**
 * 
 * @param {*} localData gridPoints for weather.gov api
 * @returns resolves into local weather response
 */
async function getWeatherFromGridPoints(localData){
    const forecastUrl = localData.properties.forecast
    return new Promise(async (resolve, reject) => {
        try { 
            const weatherData = await fetch(forecastUrl, { headers :{ 'User-Agent' : userAgent }});
            resolve(weatherData);
        }
        catch(error){
            console.log(error);
            reject(error);
        }
    })
}

/**
 * Driver function to pull apis and find local weather information
 * @returns information about todays forecast
 */
async function main() {
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
    const today = weather.properties.periods[0]
    return today
}

/**
 * 
 * @param {*} todaysInfo sets HTML information
 * @returns 
 */
function updateHTML(todaysInfo){
    const skies = todaysInfo.shortForecast
    const temp = todaysInfo.temperature
    weatherData.Skies = skies
    weatherData.Temperature = temp

    document.querySelector('p:nth-of-type(1)').innerHTML = 'Skies: ' + weatherData.Skies;
    document.querySelector('p:nth-of-type(2)').innerHTML = 'High Temperature: ' + weatherData.Temperature;
    document.querySelector('p:nth-of-type(3)').innerHTML = 'Location: ' + weatherData.location;

    return weatherData
}

/**
 * onload for weather information
 */
window.onload = async function(){
    const todaysInfo = await main()
    const today = updateHTML(todaysInfo)
    console.log(today)
}