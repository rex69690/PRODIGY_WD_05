const apiKey = "57c41aea0375b545cda7ca0562f08828";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search a"); // Changed from button to a tag
const weatherIcon = document.querySelector(".cloud img"); // Changed selector to match the cloud class

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".cloud").style.display = "none";
    document.querySelector(".data").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".cloud h1").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".cloud h2").innerHTML = data.name;
    document.querySelector(".data .humidity p").innerHTML =
      data.main.humidity + "% <br />Humidity";
    document.querySelector(".data .wind p").innerHTML =
      data.wind.speed + " km/h <br />Wind Speed";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".cloud").style.display = "block";
    document.querySelector(".data").style.display = "flex"; // Use flex to match layout
    document.querySelector(".error").style.display = "none";
  }
}

// Function to check weather based on user's current location
async function checkWeatherByLocation(lat, lon) {
  const locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await fetch(locationApiUrl);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".cloud").style.display = "none";
    document.querySelector(".data").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".cloud h1").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".cloud h2").innerHTML = data.name;
    document.querySelector(".data .humidity p").innerHTML =
      data.main.humidity + "% <br />Humidity";
    document.querySelector(".data .wind p").innerHTML =
      data.wind.speed + " km/h <br />Wind Speed";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".cloud").style.display = "block";
    document.querySelector(".data").style.display = "flex"; // Use flex to match layout
    document.querySelector(".error").style.display = "none";
  }
}

// Function to get user's current location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        checkWeatherByLocation(lat, lon);
      },
      (error) => {
        document.querySelector(".error").innerHTML =
          "Unable to access location. Please allow location access.";
        document.querySelector(".error").style.display = "block";
      }
    );
  } else {
    document.querySelector(".error").innerHTML =
      "Geolocation is not supported by this browser.";
    document.querySelector(".error").style.display = "block";
  }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Call function to get user location on page load
getUserLocation();

