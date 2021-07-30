function currentDateandTime() {
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

  let date = now.getDate();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${date}. <br/> ${hours}: ${minutes}`;
}
let todayDate = document.querySelector("#today-date");
let now = new Date();
todayDate.innerHTML = currentDateandTime(now);

//
function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
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

// function changeTofahrenheight(event) {
//   event.preventDefault();
//   let fahrenheightTemp = document.querySelector("#temperature");
//   fahrenheightTemp.innerHTML = Math.round((response.data.main.temp * 9) / 5);
// }

// let fahrenheightLink = document.querySelector("#fahrenheight");
// fahrenheightLink.addEventListener("click", changeTofahrenheight);

// function changeToCelsius(event) {
//   event.preventDefault();
//   let celsiusTemp = document.querySelector("#temperature");
//   celsiusTemp.innerHTML = Math.round(response.data.main.temp);
// }

// let celsiusLink = document.querySelector("#celsius");
// celsiusLink.addEventListener("click", changeToCelsius);