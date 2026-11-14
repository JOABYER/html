document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "8d1cdbfd3de1428daa6103958261011";
    const apiUrl = "https://api.weatherapi.com/v1/current.json";


    const searchBox = document.querySelector(".search-box");
    const weatherTemp = document.querySelector(".weather-temp");
    const searchButton = document.querySelector("button");
    const weatherDesc = document.querySelector(".weather-desc");
    const locationElm = document.querySelector(".location");
    const dateDayName = document.querySelector(".date-dayname");
    const dateDay = document.querySelector(".date-day");
    const humidityElm = document.querySelector(".humidity .value");
    const windElm = document.querySelector(".wind .value");
    const perciptionElm = document.querySelector(".percipitation .value");
    const weatherIcon = document.querySelector(".weather-container i");

    function fetchWeather(city) {
        fetch(`${apiUrl}?key=${apiKey}&q=${city}&api=no`)
            .then(respons => respons.json())
            .then(data => updateWeatherUI(data))
    }

    function updateWeatherUI(data) {
        const { location, current } = data
        locationElm.textContent = `${location.name}, ${location.country}`;
        weatherTemp.textContent = `${Math.round(current.temp_c)}°C`
        weatherDesc.textContent = current.condition.text
        humidityElm.textContent = `${current.humidity}%`
        windElm.textContent = `${current.wind_kph}km/h`
        perciptionElm.textContent = `${current.precip_mm}mm`
        weatherIcon.className = getWeatherIcon(current.condition.text)
        updatedata();
    }

    function getWeatherIcon(condition) {
        const icons = {
            "sunny": "fa-solid fa-sun icon",
            "clear": "fa-solid fa-moon icon",

            "partly cloudy": "fa-solid fa-cloud-sun icon",
            "cloudy": "fa-solid fa-cloud icon",
            "overcast": "fa-solid fa-cloud icon",

            "mist": "fa-solid fa-smog icon",
            "fog": "fa-solid fa-smog icon",
            "freezing fog": "fa-solid fa-smog icon",
            "smoke": "fa-solid fa-smog icon",
            "haze": "fa-solid fa-smog icon",
            "dust": "fa-solid fa-smog icon",
            "sand": "fa-solid fa-smog icon",

        }
        return icons[condition.toLowerCase().trim()] || "fa-solid fa-cloud icon";
    }

    function updatedata() {
        const now = new Date();

        const option = { weekday: "long" };

        dateDayName.textContent = now.toLocaleDateString("en-US", option);

        dateDay.textContent = now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }
       searchButton.addEventListener("click",()=>{
        const city = searchBox.value.trim()
        if(city) fetchWeather(city)
    });

    searchBox.addEventListener("keydown",(e)=>{
        if(e.key ==="Enter"){
            const city =searchBox.value.trim()
            if(city) fetchWeather(city)
        }
    })
});



