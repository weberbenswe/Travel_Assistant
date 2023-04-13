/*
    Pull weather data
*/
const weatherPoints = 'https://api.weather.gov/points/'
const userAgent = '(myweatherapp.com, contact@myweatherapp.com)'

async function getWeatherData(point){
    return new Promise(async (resolve, reject) => {
        try {
            const weatherData = await fetch(point, {headers :{
                'User-Agent': userAgent
            }});
            resolve(weatherData);
        }
        catch(error){
            console.log(error);
            reject(error);
        }
    })
}

function getLocationData(callback) {
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

async function getPoints(position){
    try {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const response = await fetch(weatherPoints + latitude + ',' + longitude, {
            headers :{
                'User-Agent' : userAgent
        }});
        const data = await response.json()
        const point = data.properties.forecast
        console.log('location')
        console.log(data.geometry.coordinates)
        return point
    }
    catch(error) {
        console.log(error)
    }
}

async function todaysForecast() {
    let point;
    let weather;

    await getLocationData(async function(position) {
        point = await getPoints(position)
    })

    const response = await getWeatherData(point)
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
    console.log(todaysInfo)
    console.log(skies)
    console.log(temp)
}

const button = document.getElementById('button');
button.addEventListener('click', async function() {
    const todaysInfo = await todaysForecast()
    main(todaysInfo)
})