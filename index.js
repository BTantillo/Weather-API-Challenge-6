const search = document.querySelector("#search")
const findWeather = document.querySelector("#findWeather")
const weatherToday = document.querySelector("#citySearch")
const currentForecast = document.querySelector("#currentWeather")
const futureForecast = document.querySelector("#forecast")
const previousSearch = document.querySelector("#previousSearch")
const recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || []

function getWeather(cityName) {
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6e3deac90f2db04b2c1795802533cf7c`

    fetch(weatherApi)
    .then((data)=> data.json())
    .then((newData) => {
        console.log(newData)
        let lat = newData.coord.lat
        let lon = newData.coord.lon
        const forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6e3deac90f2db04b2c1795802533cf7c&units=imperial`
        fetch(forecastApi)
        .then((data) => data.json())
        .then((newData) => {
            console.log(newData)
            TodaysWeather(newData)
            futureForecast.innerHTML = "";
            for (let i = 0; i < 6; i++) {
                renderSingleDay(newData.daily[i]) 
            }
        })
    })

}

function TodaysWeather(weather) {
    currentForecast.innerHTML = ""
    let card = document.createElement("div")
    let temp = document.createElement("h3")
    let windSpeed = document.createElement("h2")
    let humid = document.createElement("h5")
    let uv = document.createElement("h4")
    let icon = document.createElement("img")


    temp.innerText = `Tempurature: ${weather.current.temp}°F`
    windSpeed.innerText = `Wind Speed: ${weather.current.wind_speed} mph`
    humid.innerText = `Humidity: ${weather.current.humidity} %`
    uv.innerText = `UV Index: ${weather.current.uvi} `
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png` )

    if (weather.current.uvi < 3) {
        uv.classList = "background-green"
    } else if (weather.current.uvi >= 3 && weather.current.uvi < 6) {
        uv.classList = "background-yellow"
    } else {
        uv.classList = "background-red"
    }

    currentForecast.append(temp, windSpeed, humid, uv, icon)
    card.append(temp, windSpeed, humid, uv, icon)

    card.classList = "weather-now"

    currentForecast.append(card)

};


function renderSingleDay(singleDayData) {
    let card = document.createElement("div")
    let date = document.createElement("h3")
    let icon = document.createElement('img')
    let temp = document.createElement("h4")
    let wind = document.createElement("h5")
    let humid = document.createElement("h5")
     
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${singleDayData.weather[0].icon}@2x.png` )
    temp.innerText = `Tempurature: ${singleDayData.temp.day}°F`
    wind.innerText = `Wind Speed: ${singleDayData.wind_speed} mph`
    humid.innerText = `Humidity: ${singleDayData.humidity} %`


    date.innerText = `Date: ${neat(singleDayData.dt)}`
    card.append(date,temp, wind, humid, icon)
    


    card.classList = "background-blue"

    futureForecast.append(card)
}

function neat(dt) {
    let date = new Date(dt*1000)
    let year = date.getFullYear()
    let month = date.getMonth() +1
    let day = date.getDate()
    return `${month}-${day}-${year}`
}

function displayRecentSearches(searchArray){
    previousSearch.innerHTML = "<h3>Recent Searches</h3>"
    searchArray.forEach(city => {
        let cityName = document.createElement("h3")
        cityName.innerHTML = city
        previousSearch.append(cityName)
        
        
    });
    
}


findWeather.addEventListener("click", (event) => {
    event.preventDefault()
    const newCityName = weatherToday.value
    recentSearches.push(newCityName)
    displayRecentSearches(recentSearches)
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
    console.log(newCityName)
    getWeather(newCityName)
})

displayRecentSearches(recentSearches);