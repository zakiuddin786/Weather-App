const express = require('express');
const app = express.Router();

const weatherLib = require("../lib/weather")

app.get("/getCurrentWeather",weatherLib.getWeather)


module.exports = app;