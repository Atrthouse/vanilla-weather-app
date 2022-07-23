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

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherStatusElement = document.querySelector("#weatherStatus");
  let precipitation = document.querySelector("#precipitation");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#lastUpdated");
  iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  weatherStatusElement.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = lastUpdated(response.data.dt * 1000);
  iconElement.changeAtribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.cityElement.changeAtribute("alt", response.data.weather[0].description);
}

let apiKey = "2f476bb43932e1e399e2a6ea6510f337";
let chosenCity = "Prague";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&units=${units}&appid=${apiKey}`;

axios.get(apiUrl).then(showTemp);
