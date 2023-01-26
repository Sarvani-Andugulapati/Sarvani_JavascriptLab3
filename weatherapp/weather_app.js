import { WeatherApi } from "./weather.js";

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

        console.log(weatherJSON);

        const cityElement = document.querySelector(".Location .city")
        cityElement.innerText = `${weatherJSON.name}, ${weatherJSON.sys.country}`;

        const dateElement = document.querySelector(".weatherform .Location .date")
        const now = new Date();
        const dateAsString = now.toLocaleDateString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        console.log("Date as String " + dateAsString);
        dateElement.innerHTML = `${dateAsString}`;

        const temperatureElement = document.querySelector(".weatherform .current .temp")
        temperatureElement.innerHTML = `${weatherJSON.main.temp} °c`;
        const highLowElement = document.querySelector(".weatherform .current .hi-low")
        highLowElement.innerHTML = `${weatherJSON.main.temp_max}°c / ${weatherJSON.main.temp_min}°c`;

        const weatherele = document.querySelector(".weatherform .current .weather");
        const weathervalue = weatherJSON.weather[0].main;
        weatherele.innerText = weathervalue;

    }
}
export { WeatherApp }