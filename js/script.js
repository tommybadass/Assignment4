// Add student name and ID to the page automatically
document.getElementById("studentInfo").textContent = "Name: Tumhang Limbu | ID: 200590277";

// My actual API key from OpenWeatherMap 
const apiKey = "bacbcb29616cd6a6c8ded4488137a197";

// This function runs when the user clicks "Get Weather"
function getWeather() {
  // Get the city name entered by the user
  const city = document.getElementById("cityInput").value.trim().toLowerCase();

  // If the input box is empty, show a warning
  if (!city) {
    document.getElementById("weatherResult").textContent = "Please enter a city name.";
    return;
  }

  // Create the full URL to request weather info
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show the input and URL in console for testing
  console.log("City input:", city);
  console.log("Fetching URL:", url);

  // Make the actual API request
  fetch(url)
    .then(response => {
      // If the city isn't found or key isn't working
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then(data => {
      // Pull out the data we want: temperature, description, and icon
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      // Show the weather info on the webpage
      document.getElementById("weatherResult").innerHTML = `
        <p>The weather in <strong>${city}</strong> is <strong>${temp}
