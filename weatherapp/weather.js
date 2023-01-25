const Api_key = "5765df858e328074ba25442cce2ca9b9";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

class WeatherApi {

    constructor(cityName) {
        this.cityName = cityName;
        this.apiurl = new URL(API_BASE_URL);
    }

      invoke() {

        console.log("inside invoke");

        this.buildUrl();

            return fetch(this.apiurl.toString())
             .then((response)=>{
                return response.json();
             })
             .then((responseAsJson)=>{
                console.log(responseAsJson);
                return responseAsJson;
             })    
           
         .catch ((error)=> {
             console.log("Error in invoking API");
             console.log(error);
             return;
         })
    }


    buildUrl() {

        this.apiurl.searchParams.append("q", this.cityName);
        this.apiurl.searchParams.append("appid", Api_key);
        this.apiurl.searchParams.append("units", "metric");

        console.log(`URL is ${this.apiurl}`);
    }
}

export { WeatherApi }
