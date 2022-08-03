function lastUpdated(timestamp) {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    minutes = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}  |  ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
          
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="35"
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2f476bb43932e1e399e2a6ea6510f337";
  let units = "metric";
  //let apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast);
}

function showTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherStatusElement = document.querySelector("#weatherStatus");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#lastUpdated");
  let iconElement = document.querySelector("#icon");

  celsiusTempearture = response.data.main.temp;

  document.querySelector("#temperature").innerHTML = `${temperatureElement}`;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");

  temperatureElement.innerHTML = Math.round(celsiusTempearture);
  cityElement.innerHTML = response.data.name;
  weatherStatusElement.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = lastUpdated(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "2f476bb43932e1e399e2a6ea6510f337";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", handleSubmit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTempearture * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTempearture);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

let celsiusTempearture = null;

search("Prague");
