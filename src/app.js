function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
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
  let forecastHTML = `<div class="row gx-0">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col card-column">
                <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                <div class="card border-0 h-100">
                  <div class="text-center card-content">
                    <span class="card-temp-max">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="card-temp-min">${Math.round(
                      forecastDay.temp.min
                    )}°<span>
                    <div>
                      <img
                        src="images/${forecastDay.weather[0].icon}.png"
                        class="card-img-top card-image"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8678fe46de622085a6470ee25e2466ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  getForecast(response.data.coord);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let currentElement = document.querySelector("#currentTemp");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentElement.innerHTML = response.data.feels_like;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "8678fe46de622085a6470ee25e2466ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  getForecast(response.data.coord);
  axios.get(apiUrl).then(displayTemperature);
}

function searchInfo(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector("#searchInput");
  search(cityNameElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector("#searchInput");

  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchInfo);

let fahrenheitLink = document.querySelector("#tempf");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#tempC");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
