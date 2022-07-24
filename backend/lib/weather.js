const axios = require("axios")
const config = require("../config/config");
const env_config = config.get_active_config();
const moment = require("moment");

exports.getWeatherForecast = async (req,res)=>{
    let api_key = env_config.weatherAPI;
    let location = req.params.location
    console.log(`finding weather by location = ${location}`)

    // For temperature in Fahrenheit use units=imperial
    // For temperature in Celsius use units=metric
    let url = `${env_config.API_URL}/forecast?q=${location}&exclude=hourly,minutely&units=metric&appid=${api_key}`;
    
    console.log(url);
    let data = await axios.get(url);

    let city_details = data.data.city;
    let all_weather_details = data.data.list;

    let weather_details = [];

    let unique_dates = [];

    for(var i=0;i<all_weather_details.length;i++){
        let weather_object = {};
        let details = all_weather_details[i];

        weather_object.temperature = details.main.temp;
        weather_object.min_temperature = details.main.temp_min;
        weather_object.max_temperature = details.main.temp_max;
        weather_object.humidity = details.main.humidity;
        weather_object.pressure = details.main.pressure;
        weather_object.weather_icon_url = `http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`;
        weather_object.weather_description = details.weather[0].description;
        weather_object.weather_category = details.weather[0].main;
        weather_object.wind_speed = details.wind.speed;
        
        var day = moment.unix(details.dt); 
        day = day.format('ddd MMMM Do YYYY h:mm a').split(" ");

        weather_object.day = day[0];
        weather_object.month = day[1];
        weather_object.date = day[2];
        weather_object.year = day[3];
        weather_object.time = day[4];
        weather_object.state = day[5];

        if(unique_dates.indexOf(weather_object.date) == -1 ){
            console.log(weather_object)
            unique_dates.push(weather_object.date)
            weather_details.push(weather_object)
        }
    }


    let consolidated_data = {};

    consolidated_data.city_name = city_details.name;
    consolidated_data.country = city_details.country;
    consolidated_data.latitude = city_details.coord.lat;
    consolidated_data.longitude = city_details.coord.lon;

    consolidated_data.sunrise = moment.unix(city_details.sunrise).format('h:mm a');
    consolidated_data.sunset = moment.unix(city_details.sunset).format('h:mm a');
    consolidated_data.timezone = city_details.timezone;
    consolidated_data.city_population = city_details.population;
    consolidated_data.weather_details = weather_details;

    return res.status(200).send(consolidated_data)
}

exports.getCurrentWeather = async (req,res)=>{

    let api_key = env_config.weatherAPI;
    let url = `${env_config.API_URL}/weather?q=hyderabad&exclude=hourly,minutely&units=metric&appid=${api_key}`;

    let data = await axios.get(url);
    let weather_info = data.data;
    return res.status(200).send(weather_info)
}
