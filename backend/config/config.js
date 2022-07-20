module.exports = {
    "development":{
        'web_port': process.env.PORT || 3000,
        "weatherAPI":process.env.weatherAPI || "881ecf096bd74b04d794ce2b1f5eb96a",
        "API_URL":"https://api.openweathermap.org/data/2.5/forecast?"
    },
    "production":{
        'web_port': process.env.PORT || 80,
        "weatherAPI":process.env.weatherAPI || "881ecf096bd74b04d794ce2b1f5eb96a",
        "API_URL":"https://api.openweathermap.org/data/2.5/forecast?"
    },
    get_active_config: function() {
        var config_profile = process.env.ENV_MODE || 'development';
        console.log("CONFIG PROFILE SELECTED IS:  " + config_profile);
        return this[config_profile];
    }
}