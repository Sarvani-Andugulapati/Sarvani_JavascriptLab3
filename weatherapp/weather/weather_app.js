import { WeatherApi } from "./weather.js";

class WeatherApp{
init(){
this.addEventHandlers();
}

addEventHandlers(){

    const searchBoxele = document.querySelector(".search");

    searchBoxele.param1 = this;     
    searchBoxele.addEventListener("keypress", this.handleEvent);
}   

  handleEvent(event){

    console.log("inside event handler");

    if(event.key == "Enter" || event.keyCode == 13){

        console.log("enter key pressed");

        const eventTarget = event.target;

        const cityname = eventTarget.value;

        const weatherAppObj = eventTarget.param1;   

        const weatherApi = new WeatherApi(cityname);

           weatherApi.invoke().then((response)=>{  

           weatherAppObj.updateUIelements(response);    

        });

    }

}
updateUIelements(weatherJSON){

   
   const weatherele =   document.querySelector(".current .weather");
   const weathervalue = weatherJSON.weather[0].main;
   weatherele.innerText = weathervalue;

   

}
}
export{WeatherApp}