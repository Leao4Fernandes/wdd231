
const apiKey = "YOUR_API_KEY";
const lat = 38.66;
const lon = -9.07;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${"38.73"}&lon=${"-9.14"}&units=metric&appid=${"e1a570ed81369589431ef9bfb7a60fce"}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${"38.73"}&lon=${"-9.14"}&units=metric&appid=${"e1a570ed81369589431ef9bfb7a60fce"}`;

async function getCurrentWeather() {
  try {
    const response = await fetch(currentURL);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error("Current weather error:", error);
    document.querySelector("#weather-desc").textContent = "Weather unavailable";
  }
}

function displayCurrentWeather(data) {
  const icon = document.querySelector("#weather-icon");
  const iconCode = data.weather[0].icon;
  const desc = data.weather[0].description;

  icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  icon.alt = desc;

  document.querySelector("#current-temp").textContent = Math.round(data.main.temp);
  document.querySelector("#weather-desc").textContent = desc;
  document.querySelector("#temp-high").textContent = Math.round(data.main.temp_max);
  document.querySelector("#temp-low").textContent = Math.round(data.main.temp_min);
  document.querySelector("#humidity").textContent = data.main.humidity;
}

async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    displayForecast(data.list);
  } catch (error) {
    console.error("Forecast error:", error);
    document.querySelector("#forecast").innerHTML = "<li>Forecast unavailable</li>";
  }
}

// The API returns a reading every 3 hours. 
function displayForecast(list) {
  const forecastList = document.querySelector("#forecast");
  forecastList.innerHTML = "";

  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];   // "2026-11-16"
    const hour = Number(item.dt_txt.split(" ")[1].slice(0, 2));
    const current = days[date];
    if (!current || Math.abs(hour - 12) < Math.abs(current.hour - 12)) {
      days[date] = { hour, temp: item.main.temp };
    }
  });

  Object.keys(days).slice(0, 3).forEach((date, index) => {
    const li = document.createElement("li");
    const label = index === 0
      ? "Today"
      : new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" });
    li.innerHTML = `${label}: <strong>${Math.round(days[date].temp)}°C</strong>`;
    forecastList.appendChild(li);
  });
}

getCurrentWeather();
getForecast();