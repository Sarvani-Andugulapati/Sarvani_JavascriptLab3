import{WeatherApi} from "./weather.js";

function buildUrltest(){

    const weatherapi = new WeatherApi("Delhi");

    weatherapi.buildUrl();  
}
 buildUrltest();