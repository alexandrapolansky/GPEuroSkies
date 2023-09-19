// function to read CSV file and populate dropdown
async function populateDropdown() {
  const response = await fetch('city_coordinates.csv');
  const data = await response.text();
  const rows = data.split('\n').slice(1);
  const selectElement = document.getElementById('citySelect');

  rows.forEach(row => {
    const [latitude, longitude, city, country] = row.split(',');
    const option = document.createElement('option');
    option.value = `${latitude},${longitude}`;
    option.text = `${city}, ${country}`;
    selectElement.add(option);
  });
}

// mapping for user-friendly weather descriptions
const weatherMapping = {
  'clearday': 'Clear Day',
  'clearnight': 'Clear Night',
  'pcloudyday': 'Partly Cloudy Day',
  'pcloudynight': 'Partly Cloudy Night',
  'mcloudyday': 'Mostly Cloudy Day',
  'mcloudynight': 'Mostly Cloudy Night',
  'cloudyday': 'Cloudy Day',
  'cloudynight': 'Cloudy Night',
  'humidday': 'Humid Day',
  'humidnight': 'Humid Night',
  'lightrainday': 'Light Rain Day',
  'lightrainnight': 'Light Rain Night',
  'oshowerday': 'Occasional Showers Day',
  'oshowernight': 'Occasional Showers Night',
  'ishowerday': 'Isolated Showers Day',
  'ishowernight': 'Isolated Showers Night',
  'lightsnowday': 'Light Snow Day',
  'lightsnownight': 'Light Snow Night',
  'rainday': 'Rainy Day',
  'rainnight': 'Rainy Night',
  'snowday': 'Snowy Day',
  'snownight': 'Snowy Night',
  'rainsnowday': 'Rain and Snow Day',
  'rainsnownight': 'Rain and Snow Night',
  'tsday': 'Thunderstorm Day',
  'tsnight': 'Thunderstorm Night',
  'tsrainday': 'Thunderstorm with Rain Day',
  'tsrainnight': 'Thunderstorm with Rain Night'
};

// mapping for images
const imageMapping = {
  'clearday': 'clear',
  'clearnight': 'clear',
  'pcloudyday': 'pcloudy',
  'pcloudynight': 'pcloudy',
  'mcloudyday': 'mcloudy',
  'mcloudynight': 'mcloudy',
  'cloudyday': 'cloudy',
  'cloudynight': 'cloudy',
  'humidday': 'humid',
  'humidnight': 'humid',
  'lightrainday': 'lightrain',
  'lightrainnight': 'lightrain',
  'oshowerday': 'oshowernight',
  'oshowernight': 'oshowernight',
  'ishowerday': 'ishower',
  'ishowernight': 'ishower',
  'lightsnowday': 'lightsnow',
  'lightsnownight': 'lightsnow',
  'rainday': 'rain',
  'rainnight': 'rain',
  'snowday': 'snow',
  'snownight': 'snow',
  'rainsnowday': 'rainsnow',
  'rainsnownight': 'rainsnow',
  'tsday': 'tstorm',
  'tsnight': 'tstorm',
  'tsrainday': 'tsrain',
  'tsrainnight': 'tsrain'
};

//function to populate the dropdown
populateDropdown();

async function fetchWeatherData(latitude, longitude) {
  const url = `/.netlify/functions/weather?lon=${longitude}&lat=${latitude}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createWeatherCard(date, forecast, temp, imgSrc) {
  const card = document.createElement('div');
  card.className = 'weather-card';

  card.innerHTML = `
    <h4>${date}</h4>
    <img src="${imgSrc}" alt="${forecast}">
    <p>${forecast}</p>
    <p>${temp}°C</p>
  `;

  return card;
}

function handleCitySelection(event) {
  const selectedValue = event.target.value;
  const [latitude, longitude] = selectedValue.split(',');

  fetchWeatherData(latitude, longitude)
    .then(data => {
      const weatherContainer = document.getElementById('weatherContainer');
      weatherContainer.innerHTML = '';

      const currentDate = new Date();

      for (let i = 0; i < 7; i++) {
        const dayData = data.dataseries[i];
        
        // calculate the date based on the timepoint value and the loop index
        const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000).toDateString();
        
        const forecast = weatherMapping[dayData.weather] || 'Unknown';
        const temp = dayData.temp2m;

        const imgName = imageMapping[dayData.weather] || 'unknown';  // fallback to 'unknown' if the forecast type is not in the mapping
        const imgSrc = `images/${imgName}.png`;

        const weatherCard = createWeatherCard(date, forecast, temp, imgSrc);
        weatherContainer.appendChild(weatherCard);
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

// event listener to the dropdown
const citySelectElement = document.getElementById('citySelect');
  citySelectElement.addEventListener('change', handleCitySelection);

// topRightImage
  document.addEventListener('DOMContentLoaded', function() {
    const topRightImage = document.getElementById('topRightImage');
    topRightImage.style.backgroundImage = 'url(images/cornermap.jpg)';
    topRightImage.style.backgroundSize = 'cover';
    topRightImage.style.backgroundRepeat = 'no-repeat';
    topRightImage.style.width = '17rem';
    topRightImage.style.height = '17rem';

  });