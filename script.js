
const apiKey = "aafe82c658febc382192427315c7792e"

const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon =document.querySelector(".icon")

formEle.addEventListener("submit" ,(e)=>{
    e.preventDefault()
    const cityValue = cityNameEle.value 

    if (cityValue!== ""){
        getWeatherData(cityValue)
        cityNameEle.value =""
    }

    getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
    try{
        const responsc = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!responsc.ok){
            throw new Error("response not ok")
        }
    

        const data = await responsc.json()
        console.log(data);
        
       const city = data.name
       const temprature = Math.floor(data.main.temp)
       const description = data.weather[0].description
       const icon = data.weather[0].icon
       const details = [
       /* `Fells Like: ${data.main.fells_like}°C`,*/
        `आर्द्रता (Humidity): ${data.main.humidity}%`,
        `हावाको गति (Wind Speed): ${data.wind.speed}m/s`,
        `बायुको चाँप (Pressure): ${data.main.pressure}<br>hPa(mb)`,
        `दृस्यता (Visibility): ${data.visibility/1000}Km`   
       ]
       weatherDataEle.querySelector(".city").textContent = `${city}`
       weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`
       weatherDataEle.querySelector(".desc").textContent = `${description}`

      /* imgIcon.innerHTML =`https://openweathermap.org/img/wn/${icon.png}.png`*/
     /* document.querySelector(".weather").computedStyleMap.display ="block"*/

       weatherDataEle.querySelector(".details").innerHTML =details.map((detail)=>{
       return `<div>${detail}</div>`

       }).join("")



    }catch(err){
        weatherDataEle.querySelector(".temp").textContent = ""
        imgIcon.innerHTML =""
        weatherDataEle.querySelector(".desc").textContent =" नाम भेटिएन ! अर्को नाम  लेख्नुहोस् "

    }
    

    }
    
   
