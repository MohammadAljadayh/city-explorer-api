'use strict';

const Forcast=require('../models/weather.model');
require("dotenv").config();
const axios= require("axios");
const getWeather=async (req, res) => {

    let lat = req.query.lat;
    let lon = req.query.lon;
    const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`
  
    axios.get(weatherUrl).then(result =>{
      console.log(result);
      const weatherArray = result.data.data.map(item=>{
      return new Forcast (item);
      })
    res.send(weatherArray);
    })
    .catch(err =>{
      res.send(`there is an error in getting the data => ${err}`);
    })
    
  
  } 

  module.exports=getWeather;