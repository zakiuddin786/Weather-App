const express = require('express');
const app = express.Router();

const weatherLib = require("../lib/weather")

// A higher order function created for handling errors in the functions
const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

app.get("/getCurrentWeather/:location",asyncHandler(weatherLib.getWeatherForecast))


module.exports = app;