let now = new Date();
let displayDate = document.querySelector("#date");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
displayDate.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;
function toFahrenheit(event) {
  event.preventDefault();
  let celsiusDegrees = parseFloat(
    document.querySelector("#today-temp-display").textContent
  );
  let fahrenheitConversion = Math.round((celsiusDegrees * 9) / 5 + 32);
  let fahrenheitDegrees = document.querySelector("#today-temp-display");
  fahrenheitDegrees.innerHTML = `${fahrenheitConversion}°F`;
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", toFahrenheit);
function toCelsius(event) {
  event.preventDefault();
  document.querySelector("#today-temp-display").innerHTML = `13°C`;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", toCelsius);
function showCity(event) {
  event.preventDefault();
  let displayCity = document.querySelector("h1");
  let cityInput = document.querySelector("#search-city");
  displayCity.innerHTML = `${cityInput.value}`;
}

function searchCity(city) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let city = cityInput.value;
  searchCity(city);
}
function showTemperature(response) {
  console.log(response);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temp-display");
  temperatureElement.innerHTML = `${temperature}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = ` ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = ` ${response.data.wind.speed} km/h`;
  document.querySelector(
    "#description"
  ).innerHTML = ` ${response.data.weather[0].main}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#city-name").textContent = response.data.name;
  document.querySelector("#today-temp-display").textContent =
    Math.round(response.data.main.temp) + "°C";
}
function searchLocation(position) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Lisbon");
