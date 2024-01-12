

  document.getElementById('search').addEventListener('keyup', event => {
    search(event.target.value);
  });
  
  // Initial weather display
  search('cairo');
  
  // Function to fetch and display weather data (Api)
  async function search(location) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`);
      if (response.ok) {
        const data = await response.json();
        displayWeather(data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('An error occurred while fetching weather data:', error);
    }
  }
  
  // display weather data
  function displayWeather(data) {
    const today = data.current;
    const location = data.location;
    const forecastDays = data.forecast.forecastday.slice(1); // Exclude today
  
    const todayDate = new Date(today.last_updated.replace(" ", "T"));
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][todayDate.getDay()];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][todayDate.getMonth()];
  
    const currentWeatherHTML = `
      <div class="today forecast" >
        <div class="forecast-header" id="today">
        <div class="day">${dayOfWeek}</div>
          <div class="date">${todayDate.getDate()} ${month}</div>
        </div>
        <div class="forecast-content" id="current">
          <div class="location">${location.name}</div>
          <div class="degree">
            <div class="num">${today.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon">
              <img src="https:${today.condition.icon}" alt="" width="90">
            </div>
          </div>
          <div class="custom mb-2" style="color: #009ad8; font-size: large">${today.condition.text}</div>
          <span><img src="images/icon-umberella.png" alt="">${today.humidity}%</span>
          <span><img src="images/icon-wind.png" alt="">${today.wind_kph}km/h</span>
          <span><img src="images/icon-compass.png" alt="">${today.wind_dir}</span>
        </div>
      </div>
    `;
  
    const forecastHTML = forecastDays.map(day => `
    <div class="forecast" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 5px 0px, rgba(0, 0, 0, 0.1) 0px 10px 5px 0px;">
      <div class="forecast-header">
        <div class="day">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
      </div>
      <div class="forecast-content">
        <div class="forecast-icon">
          <img src="https:${day.day.condition.icon}" alt="" width="48">
        </div>
        <div class="degree">${day.day.maxtemp_c}<sup>o</sup>C</div>
        <small>${day.day.mintemp_c}<sup>o</sup></small>
        <div class="custom" style="color: #009ad8; font-size: large">${day.day.condition.text}</div>
      </div>
    </div>
  `).join('');
  
  
    document.getElementById('forecast').innerHTML = currentWeatherHTML + forecastHTML;
  }
  