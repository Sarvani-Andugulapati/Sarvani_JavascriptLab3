import { WeatherApi } from "./weather/weather.js";

class WeatherApp {
    init() {
        this.addEventHandlers();
    }

    addEventHandlers() {

        const searchBoxele = document.querySelector(".search");

        searchBoxele.param1 = this;
        searchBoxele.addEventListener("keypress", this.handleEvent);
    }

    handleEvent(event) {

        console.log("inside event handler");

        if (event.key == "Enter" || event.keyCode == 13) {

            console.log("enter key pressed");

            const eventTarget = event.target;

            const cityname = eventTarget.value;

            const weatherAppObj = eventTarget.param1;

            const weatherApi = new WeatherApi(cityname);

            weatherApi.invoke().then((invresponse) => {

                weatherAppObj.updateUIelements(invresponse);

            });

        }

    }
    updateUIelements(weatherJSON) {

        const cityElement = document.querySelector(".location .city")
        cityElement.innerText = `${weatherJSON.name}, ${weatherJSON.sys.country}`;

        const dateElement = document.querySelector(".location .date")
        const now = new Date();
        const dateAsString = now.toLocaleDateString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        console.log("Date as String " + dateAsString);
        dateElement.innerHTML = `${dateAsString}`;

        const temperatureElement = document.querySelector(".current .temp")
        temperatureElement.innerHTML = `${weatherJSON.main.temp} °c`;
        const highLowElement = document.querySelector(".current .hi-low")
        highLowElement.innerHTML = `${weatherJSON.main.temp_max}°c / ${weatherJSON.main.temp_min}°c`;

        const weatherele = document.querySelector(".current .weather");
        const weathervalue = weatherJSON.weather[0].main;
        weatherele.innerText = weathervalue;

    }
}
export { WeatherApp }