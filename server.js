const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const env_config = require("./backend/config/config")
const port = env_config.get_active_config().web_port;

app.use(morgan('dev'));

app.use(bodyParser.json({
    limit: '50mb'
  }));

app.use(bodyParser.urlencoded({
limit: '50mb',
parameterLimit: 1000000,
extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"dist/weather_app")))
let allRoutes = require("./backend/routes/allRoutes");

app.use("/api",allRoutes)

app.get("/*",(req,res)=>{
  res.sendFile(path.join(_dirname,'dist/weather_app/index.html'))
})

app.listen(port, () => console.log(`Weather app listening at http://localhost:${port}`))