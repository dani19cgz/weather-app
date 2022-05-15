let now = new Date();
let ptimestamp = document.querySelector(".timestamp");
let currentdate = now.getDate();

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

let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let seconds = now.getSeconds();
if (seconds < 10) {
  seconds = `0${seconds}`;
}
ptimestamp.innerHTML = `${day}, ${month} ${currentdate}, ${year} ${hour}:${minutes}:${seconds}`;

function getCityWeather(city) {
  let body = document.querySelector("body");
  body.style.backgroundImage = `url(https://source.unsplash.com/random/?${city})`;

  let apiKEY = "90c3a32a0e06fb93eb6a122e67621bea";
  let apiendpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiendpoint}?q=${city}&appid=${apiKEY}&units=metric`;

  axios.get(apiURL).then(showTemperature);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];

  let forecastHTML = `<div class="row justify-content-center">`;
  days.forEach(function (day) {
    forecastHTML = `${forecastHTML}
      <div class="col">
      <div class="justify-content-around">
                  <div class="card text-center">
                    <div class="card-body">
                      <p class="card-title">${day}</p>
                      <span><img src="http://openweathermap.org/img/wn/10d@2x.png" alt="Clear" id="icontemp" width="36"></span>
                      <p> <span class="forecast-min">6°</span> <span class="forecast-max">13°</span></p>
                    </div>
                  </div>
                  </div>
                  </div>
                `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#randomCity").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#feeling").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document
    .querySelector("#icontemp")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  let fahrenheit = document.querySelector("#tempF");
  fahrenheit.addEventListener("click", function changetoF(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp");
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let Ftemperature = (response.data.main.temp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(Ftemperature);
  });
  let celsius = document.querySelector("#tempC");
  celsius.addEventListener("click", function changetoC(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temp");
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    temperature.innerHTML = Math.round(response.data.main.temp);
  });
  displayForecast();
}

let search = document.querySelector("#cityform");

search.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getCityWeather(city);
});

getCityWeather("Berlin");

// //  {
// //
// //   forecastElement.innerHTML = "Forecast";
// // }
// // function getForecast(coordinates) {
// //   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

// //   axios.get(apiUrl).then(displayForecast);
// // }
