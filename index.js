const search = document.querySelector("#search")
const findWeather = document.querySelector("#findWeather")
const weatherToday = document.querySelector("#citySearch")
const currentForecast = document.querySelector("#currentWeather")
const futureForecast = document.querySelector("#forecast")

function getWeather(cityName) {
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6e3deac90f2db04b2c1795802533cf7c`

    fetch(weatherApi)
    .then((data)=> data.json())
    .then((newData) => console.log(newData))

}

findWeather.addEventListener("click", (event) => {
    event.preventDefault()
    const newCityName = weatherToday.value
    console.log(newCityName)
    getWeather(newCityName)
})