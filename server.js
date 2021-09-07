'use strict';
const express = require("express");
const app = express();
const weatherData = require("./Data/weather.json");
const axios= require("axios");
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT;
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;



app.get("/",
function (req, res) {
  res.send("Hello you are in the root , ");
});


class Forecast {

  constructor(date,description){

    this.date=date;
    this.description=description;
  }
}

app.get("/weather", async (req, res) => {

  console.log("I Am weather");
  // let city_name=req.query.city_name;

  let lat=req.query.lat;
  let lon=req.query.lon;
  const weatherBitUrl='http://api.weatherbit.io/v2.0/forecast/daily';

  try {
    let weatherBitResult = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
    res.json(weatherBitResult.data);
  } catch (error) {
    res.json(error.data);
  }


//   const returnArray=weatherData.find((item) => {
// return(item.city_name.toLowerCase() === city_name.toLocaleLowerCase());
//   });
  
//   if (returnArray){

//     let newArr=returnArray.data.map((item) => {
  
//       return new Forecast(item.datetime,item.weather.description);
//     });
//     res.json(newArr);
//   }
//   else {
  
//     res.json('data not found');
//   }
});














app.get("*", (req, res) => {
  res.status(404).send("sorry, this page not found");
});

app.listen(PORT,() => {
  console.log(`Listening on PORT ${PORT}`);
});