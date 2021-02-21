// time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "Juli",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getUTCFullYear();
let hrs = now.getUTCHours() + 1;
let min = now.getUTCMinutes();
if (min < 10) {
  min = "0" + min;
}

let time = `${hrs} : ${min}`;
let date = now.getDate();
let dayTime = "AM";
if (hrs > 11) {
  dayTime = "PM";
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `Updated ${date} ${month} ${year} `;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${time} ${dayTime} `;

//global variables temperature
let city = "San Francisco";
let unit = "metric";
let apiKey = "13a1b6ce652bc0d4bb4d98d6d58fd9c2";

function showTemperature(response) {
  city = response.data.name;
  let country = response.data.sys.country;
  let temp = Math.round(response.data.main.temp);
  let feelTemp = Math.round(response.data.main.feels_like);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  let cloudsDescription = response.data.weather[0].description;
  if (cloudsDescription == "clear sky") {
    cloudsDescription = "clear skies";
  }
  if (cloudsDescription == "few clouds") {
    cloudsDescription = "a few clouds";
  }
  let humidityValue = Math.round(response.data.main.humidity);
  let windValue = Math.round(response.data.wind.speed);
  let cloudValue = response.data.clouds.all;

  let h1 = document.querySelector("h1");
  let p1 = document.querySelector("#current-weather-description-1");
  let currentDegrees = document.querySelector("#current");
  let minDegrees = document.querySelector("#minimal");
  let maxDegrees = document.querySelector("#maximal");
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Precipitation ${humidityValue}%`;
  let wind = document.querySelector("#wind");
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `Clouds ${cloudValue}%`;

  if (unit == "imperial") {
    h1.innerHTML = `${city} (${country}) feels like ${feelTemp}ºF`;
    p1.innerHTML = `${day} will have ${cloudsDescription} `;
    currentDegrees.innerHTML = `Currently ${temp}º`;
    minDegrees.innerHTML = `Min. ${tempMin}º`;
    maxDegrees.innerHTML = `Max. ${tempMax}º`;
    wind.innerHTML = `Wind ${windValue} mph`;
  } else {
    h1.innerHTML = `${city} (${country}) feels like ${feelTemp}ºC`;
    p1.innerHTML = `${day} will have ${cloudsDescription}`;
    currentDegrees.innerHTML = `Currently ${temp}º`;
    minDegrees.innerHTML = `Min. ${tempMin}º`;
    maxDegrees.innerHTML = `Max. ${tempMax}º`;
    wind.innerHTML = `Wind ${windValue} km/h`;
  }
  let iconId = response.data.weather[0].id;
  let iconCurrentWeather = document.querySelector("#current-image");
  if ((iconId >= 200) & (iconId < 300)) {
    iconCurrentWeather.src = "images/wolk-bliksem.png";
  } else if (iconId >= 300 && iconId < 400) {
    iconCurrentWeather.src = "images/regen-zon.png";
  } else if (iconId >= 500 && iconId < 500) {
    iconCurrentWeather.src = "images/druppel.png";
  } else if (iconId == 800) {
    iconCurrentWeather.src = "images/zon.png";
  } else if (iconId == 801 || iconId == 802) {
    iconCurrentWeather.src = "images/wolk-zon.png";
  } else if (iconId == 802 || iconId == 803 || iconId == 741) {
    iconCurrentWeather.src = "images/wolk-grauw.png";
  } else if (iconId == 804) {
    iconCurrentWeather.src = "images/wolken-regen.png";
  } else {
    iconCurrentWeather.src = "images/Wolken-regen.png";
  }
}

function showForecast(response) {
  //daycard 0:
  let temp0 = document.querySelector("#degrees-forecast-0");
  let tempCard0 = Math.round(response.data.list[0].main.temp);
  //1
  let temp1 = document.querySelector("#degrees-forecast-1");
  let tempCard1 = Math.round(response.data.list[1].main.temp);
  //2
  let temp2 = document.querySelector("#degrees-forecast-2");
  let tempCard2 = Math.round(response.data.list[2].main.temp);
  //3
  let temp3 = document.querySelector("#degrees-forecast-3");
  let tempCard3 = Math.round(response.data.list[3].main.temp);
  //4
  let temp4 = document.querySelector("#degrees-forecast-4");
  let tempCard4 = Math.round(response.data.list[4].main.temp);

  if (unit == "imperial") {
    temp0.innerHTML = `${tempCard0}ºF`;
    temp1.innerHTML = `${tempCard1}ºF`;
    temp2.innerHTML = `${tempCard2}ºF`;
    temp3.innerHTML = `${tempCard3}ºF`;
    temp4.innerHTML = `${tempCard4}ºF`;
  } else {
    temp0.innerHTML = `${tempCard0}ºC`;
    temp1.innerHTML = `${tempCard1}ºC`;
    temp2.innerHTML = `${tempCard2}ºC`;
    temp3.innerHTML = `${tempCard3}ºC`;
    temp4.innerHTML = `${tempCard4}ºC`;
  }

  function forecastCard(number) {
    let timeCard = document.querySelector("#date-day-" + number);
    let timeValue = response.data.list[number].dt_txt;
    timeCard.innerHTML = timeValue.replace(" ", "<br>");
    timeCard.innerHTML = timeValue.substring(10, 16);

    let iconCard = document.querySelector("#weather-icon-forecast-" + number);
    let iconId = response.data.list[number].weather[0].id;
    if ((iconId >= 200) & (iconId < 300)) {
      iconCard.src = "images/wolk-bliksem.png";
    } else if (iconId >= 300 && iconId < 400) {
      iconCard.src = "images/regen-zon.png";
    } else if (iconId >= 500 && iconId < 500) {
      iconCard.src = "images/druppel.png";
    } else if (iconId == 800) {
      iconCard.src = "images/zon.png";
    } else if (iconId == 801 || iconId == 802) {
      iconCard.src = "images/wolk-zon.png";
    } else if (iconId == 802 || iconId == 803 || iconId == 741) {
      iconCard.src = "images/wolk-grauw.png";
    } else if (iconId == 804) {
      iconCard.src = "images/wolken-regen.png";
    } else {
      iconCard.src = "images/wolken-regen.png";
    }
  }

  forecastCard(0);
  forecastCard(1);
  forecastCard(2);
  forecastCard(3);
  forecastCard(4);
}

axios.get(getApiUrl()).then(showTemperature);
axios.get(getApiUrlForecast()).then(showForecast);

//search engine
function enteredCity(event) {
  event.preventDefault();
  city = document.querySelector("#entered-city").value;
  let apiUrlValue = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&lang=en&appid=${apiKey}`;
  axios.get(apiUrlValue).then(showTemperature);
  axios.get(getApiUrlForecast()).then(showForecast);
}

let button = document.querySelector("#button");
button.addEventListener("click", enteredCity);
let textField = document.querySelector("#entered-city");
textField.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    enteredCity(event);
  }
});

//geolocatie
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?units=${unit}&lat=${lat}&lon=${lon}&lang=en&appid=${apiKey}`;
  axios.get(apiUrlPosition).then(showTemperature);
  let apiUrlForecastPosition = `https://api.openweathermap.org/data/2.5/forecast?units=${unit}&lat=${lat}&lon=${lon}&lang=en&appid=${apiKey}`;
  axios.get(apiUrlForecastPosition).then(showForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoButton = document.querySelector("#geo-location");
geoButton.addEventListener("click", getCurrentPosition);

function CelsiusToFahrenheit(event) {
  event.preventDefault();
  unit = "imperial";
  axios.get(getApiUrl()).then(showTemperature);
  axios.get(getApiUrlForecast()).then(showForecast);
}

let fahrenheitRef = document.querySelector("#fahrenheit-ref");
fahrenheitRef.addEventListener("click", CelsiusToFahrenheit);

function FahrenheitToCelsius(event) {
  event.preventDefault();
  unit = "metric";
  axios.get(getApiUrl()).then(showTemperature);
  axios.get(getApiUrlForecast()).then(showForecast);
}
let celsiusRef = document.querySelector("#celsius-ref");
celsiusRef.addEventListener("click", FahrenheitToCelsius);

function getApiUrl() {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&lang=en&appid=${apiKey}`;
}

function getApiUrlForecast() {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&lang=en&appid=${apiKey}`;
}