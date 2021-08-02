function formatDate(timestamp) {
  let now = new Date(timestamp);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let currentDate = now.getDate();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}<br/>${month}, ${currentDate}`;
}
function formatDay(timestamp) {
  let day = date.getDay();
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["fri", "sat", "sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
  <div class="weather-forecast-date">${day}</div>
  <img
  src="http://openweathermap.org/img/wn/
  @2x.png"
  alt=""
  width="42"
  />
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max"> 22
  ° </span>
  <span class="weather-forecast-temperature-min"> 18
  ° </span>
  </div>
  </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5447915a7bcf0a835af038a7bf56c3a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(currentCity) {
  let apiKey = "5447915a7bcf0a835af038a7bf56c3a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-for-city-form").value;
  searchCity(currentCity);
}
let citySearch = document.querySelector("#searchFor-city");
citySearch.addEventListener("submit", handleSubmit);
searchCity("London");
//bonus section

function getPosition(position) {
  let apiKey = "52c27b823b5e4605e95077da47ea6eb2";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function getGeolocationCoordinates() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let getGeolocation = document.querySelector("#button-location");
getGeolocation.addEventListener("click", getGeolocationCoordinates);

function changeTofahrenheight(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheightLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheightTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheightTemperature);
}

function changeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheightLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheightLink = document.querySelector("#fahrenheight");
fahrenheightLink.addEventListener("click", changeTofahrenheight);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);

let celsiusTemperature = "null";
