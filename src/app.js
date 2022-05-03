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

function showTemperature(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#randomCity").innerHTML = response.data.name;
}

let search = document.querySelector("#cityform");

search.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  console.log("#city-input");
  let apiKEY = "90c3a32a0e06fb93eb6a122e67621bea";
  let apiendpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiendpoint}?q=${city}&appid=${apiKEY}&units=metric`;

  axios.get(apiURL).then(showTemperature);
});

//let celsius = document.querySelector("#tempC");

//celsius.addEventListener("click", function changetoC(event) {
//event.preventDefault();
//let temperature = document.querySelector("#temp");
//temperature.innerHTML = `15`;
//});

//let fahrenheit = document.querySelector("#tempF");
//fahrenheit.addEventListener("click", function changetoF(event) {
//event.preventDefault();
//let temperature = document.querySelector("#temp");
//temperature.innerHTML = `57`;
//});