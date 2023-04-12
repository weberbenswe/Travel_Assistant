/*
    Pull weather data
*/
const fetchPoints = 'https://api.weather.gov/points/'

async function getWeatherData(){
    return new Promise(async (resolve, reject) => {
        try {
            const weatherData = await fetch('https://api.weather.gov/', {headers :{
                'User-Agent': '(myweatherapp.com, contact@myweatherapp.com)'
            }});
            console.log(weatherData);
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
                console.log(position);
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
        const response = await fetch(fetchPoints + latitude + ',' + longitude, {
            headers :{
                'User-Agent' : '(myweatherapp.com, contact@myweatherapp.com)'
        }});
        const data = await response.json()
        const point = data.properties.forecast
        return point
    }
    catch(error) {
        console.log(error)
    }
}

async function main() {
    let point;
    await getLocationData(async function(position) {
        point = await getPoints(position)
    })
    await getWeatherData()
    console.log(point)
}

const button = document.getElementById('button');
button.addEventListener('click', function() {
    main()
})