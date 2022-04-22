const fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const humidityElement = document.querySelector('.humidity');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3) + " " + new Date().getFullYear();


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    locationElement.textContent = "City not found...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;

    async function fetchData() {
        try {
            const response = await
                fetch(locationApi)
            if (!response.ok) {
                const message = `error has occured: ${response.status}`;
                throw new Error(message)
            }
            const data = await response.json()
            if (data.error) {
                locationElement.textContent = data.error
                tempElement.textContent = ""
                weatherCondition.textContent = ""
                humidityElement.textContent = ""
                weatherForm.reset()
            } else {
                locationElement.textContent = 'City: ' + data.cityName
                tempElement.textContent = 'Temperature: ' + (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) + 'C'
                weatherCondition.textContent = 'Weather Condition: ' + data.description
                humidityElement.textContent = 'Humidity: ' + data.humidity
                weatherForm.reset()
            }
        } catch (error) {
            console.log('something wrong', error.message);
        }
    }

    fetchData()
})
