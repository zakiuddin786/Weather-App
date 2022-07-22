const axios = require("axios")
const config = require("../config/config");
const env_config = config.get_active_config();

exports.getWeatherForecast = async (req,res)=>{
    let api_key = env_config.weatherAPI;
    let url = `${env_config.API_URL}/forecast?q=hyderabad&appid=${api_key}`;
    
    console.log(url);
    let data = await axios.get(url);
    let weather_info = data.data;
    return res.status(200).send(weather_info)
}

exports.getCurrentWeather = async (req,res)=>{

    let api_key = env_config.weatherAPI;
    let url = `${env_config.API_URL}/weather?q=hyder&appid=${api_key}`;

    let data = await axios.get(url);
    let weather_info = data.data;
    return res.status(200).send(weather_info)
}
