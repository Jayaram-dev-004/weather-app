import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import {useState , useEffect, useRef} from 'react'
import importImages from './utils/images'
import './App.css'

const Weather = () => {

    const [input, setInput] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const [alert, setAlert] = useState('')
    const inputref = useRef()


    const api = axios.create({
        baseURL: `https://api.openweathermap.org//data/2.5/`,
      });
    

    const fetchData = async (city) => {
        if(city === "") {
            setAlert('Enter a city name'); 
            return;
        }
        else{
            setAlert('')
        }
        try{
            const response = await api.get(`/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`);
            console.log(response.data);
         
            const report = {
                name : response.data.name,
                temp : response.data.main.temp,
                min_temp : response.data.main.temp_min,
                max_temp: response.data.main.temp_max,
                pressure: response.data.main.pressure,
                sea_level: response.data.main.sea_level,
                speed : response.data.wind.speed,
                humitidy : response.data.main.humidity,
                description : (response.data.weather[0].description).charAt(0).toUpperCase() + response.data.weather[0].description.slice(1),
                //icons
                icon : `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` 
            }
            setWeatherData(report);
        }
        catch(err){ 
            setAlert("Enter the correct city name");
            console.error("Please rectify the error",message.err);
        }
    }
   
    
    useEffect(() =>{
        fetchData('chennai')
    },[input])

  return (
    <>
    
    <div className="headingh1">
      <h1>Let's explore the world!!</h1>
    </div>

    <div className="container">
        <div className="userinput">
            <input type="text" 
                placeholder='Enter a city name...' 
                className='weather-input'
                ref={inputref}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      fetchData(inputref.current.value); 
                      inputref.current.value = ""; 
                    }}
                }
            />
            <FaSearch 
                style = {{minWidth:'10%' ,display:'inline', flexGrow:'0'}}
                role='button'
                onClick={() =>{ 
                    fetchData(inputref.current.value); 
                    inputref.current.value = '';
                    
                }}
            />
          
        </div>
        
        <p className="alert">{alert}</p>
        
        <div className="main-container">
            <div className="climate-img">
                <img src={weatherData.icon} alt="" />
            </div>
            <div className="climate-report">
                <p className='temp'>{Math.floor(weatherData.temp)}°C</p>
                <p className='city'>{weatherData.name}</p>
                <p className='description'>{weatherData.description}</p>
            </div>
        </div>

        <div className="footer-report">
            
            <div className="report windspeed">
                <img src={importImages ('wind_speed.png')} alt="windspeed" className='report-icon'/>
                <p className='report-value'>{weatherData.speed}Km/h</p>
                <p className='report-name'>Wind Speed</p>
            </div>
            <div className="report max_temp">
                <img src={importImages ('max_temp.png')} alt="max_temp" className='report-icon'/>
                <p className='report-value'>{weatherData.max_temp}°C</p>
                <p className='report-name'>Max-Temp</p>
            </div>
            <div className="report min_temp">
                <img src={importImages ('min_temp.png')} alt="min_temp" className='report-icon'/>
                <p className='report-value'>{weatherData.min_temp}°C</p>
                <p className='report-name'>Min-Temp</p>
            </div>
            <div className="report pressure">
                <img src={importImages ('pressure.png')} alt="pressure" className='report-icon'/>
                <p className='report-value'>{weatherData.pressure}hPa</p>
                <p className='report-name'>Pressure</p>
            </div>
            <div className="report humidity">
                <img src={importImages ('humidity.png')} alt="humidity" className='report-icon'/>
                <p className='report-value'>{weatherData.humitidy}%</p>
                <p className='report-name'>Humidity</p>
            </div>
            <div className="report sea-level">
                <img src={importImages ('sea_level.png')} alt='sea_level' className='report-icon'/>
                <p className='report-value'>{weatherData.sea_level}m</p>
                <p className='report-name'>Sea Level</p>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default Weather
