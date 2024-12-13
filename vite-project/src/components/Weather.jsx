import { useState } from "react";
import axios from 'axios'
import '../styles/weather.css'
function Weather(){

    let [weatherData,setWeaterData] = useState({

    })
    let [city,setCity] = useState("")
    

    const apikey='a770456acff85af1a0df6645ae8d8856';


    function handleChange(e){
        setCity(e.target.value)
    }

    async function handleData(){
        try{
            let data =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
            setWeaterData(data.data)
            console.log(data)
        
            
        }
        catch(error){
            alert("Please Enter Valid City Name")
            console.log(error)
        }
    

    }
    const temperatureCelsius = weatherData.main ? weatherData.main.temp - 273 : null;
    const barWidth = temperatureCelsius ? (temperatureCelsius / 100) * 350 : 0; 
    

    return(
        <>
        <div>
            <h1>Weather Application</h1>
            <div id="input">
                <input type="text" name="city" placeholder="Enter City Name" onChange={handleChange}/>
                <button onClick={handleData}>Search</button>
            </div>

            {weatherData.name && weatherData.main && (
                    <div>
                        <h1>{weatherData.name}</h1>
                        <h2>{(weatherData.main.temp - 273).toFixed(2)}°C</h2>
                    <div
                            style={{
                            width: "350px",
                            height: "30px",
                            border: "2px solid black",
                            position: "relative",
                            borderRadius: "10px",
                            overflow: "hidden",
                            }}
                        >
                        <div
                            style={{
                            width:  `${barWidth}px`,
                            height: "100%",
                            backgroundColor: temperatureCelsius > 15 ? "blue" :"orange",
                            position: "absolute",
                            left: "0",
                        }}
                        ></div>
                    </div>
                         <p>{weatherData.weather[0].description}</p>
                        
                         <img
                                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                alt="Weather Icon"
                                style={{ width: "100px", height: "100px" }}
                            />

                     </div>
                 )}
           
            

         </div>
         </>
     )
 }

export default Weather