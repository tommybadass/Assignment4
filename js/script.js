// This adds my name and student ID to the page when it loads
document.getElementById("studentInfo").textContent = "Name: Tumhang Limbu | ID: 200590277";

// My personal API key from OpenWeatherMap
const apiKey = "bacbcb29616cd6a6c8ded4488137a197";

// Function runs when user clicks the "Get Weather" button
function getWeather() {
  // Grab the city name from the input box
  const city = document.getElementById("cityInput").value.trim().toLowerCase();

  // Check if user left it blank
  if (!city) {
    document.getElementById("weatherResult").textContent = "Please enter a city name.";
    return;
  }

  // This is the full URL for the API call
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Just logging for debugging purposes
  console.log("City input:", city);
  console.log("Requesting:", url);

  // Make the actual request to the weather API
  fetch(url)
    .then(response => {
      // If something went wrong (like a wrong city name), show an error
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then(data => {
      // Get the stuff we need from the response: temperature, description, and icon
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      // Display the result in the page
      document.getElementById("weatherResult").innerHTML = `
        <p>Current temperature in <strong>${city}</strong> is <strong>${temp}°C</strong> with <em>${desc}</em>.</p>
        <img src="${iconUrl}" alt="Weather icon">
      `;
    })
    .catch(error => {
      // Show any errors that happen 
      document.getElementById("weatherResult").textContent = error.message;
    });
}
