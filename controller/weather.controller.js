'use strict';
require("dotenv").config();
const axios= require("axios");

const Forcast=require('../models/weather.model');

const Cache=require('../helper/cache.helper');
let cacheObject=new Cache();


console.log('================');
console.log('Cache instance created');
console.log('================');

/** TODO:
 * 
 * 1- we want to cache the data only when we dont have that data in our cache
 *    - check if the cache has the lat and lon location saved
 *    - if not then request the data from weatherBit
 *    - after you get a response, save the modeled data into the cache
 *    - Send the data to the user
 * 2 - if the cache has any forecast data, then send the data from the cache 
 *    - check if teh cache has the lat and lon location
 *    - if it has it, then return that data from the cache directly 
 * 3- We want to delete the cache passing one day
 */


const getWeather=async (req, res) => {

    // let lat = req.query.lat;
    // let lon = req.query.lon;

    const { lon,lat }=req.query;
    console.log('================');
    console.log('Check If cache has any forcast data');
    console.log('================');


  const dayInMilSec = 86400000;
  const oneDayPassed = (Date.now() - cacheObject.timeStamp) > dayInMilSec;
  if (oneDayPassed) {
    console.log('================');
    console.log('Cache Reset');
    console.log('================');
    cacheObject = new Cache();
  }

  const foundData = cacheObject.foreCast.find(location => location.lat === lat && location.lon === lon);

    if(foundData) {
      res.json(foundData.weatherArray);
    }
    else{
      console.log('No Cache data found');
      console.log('================');

      const WEATHER_API_KEY=process.env.WEATHER_API_KEY;

      try {
      let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`
    
      axios.get(weatherUrl).then(result =>{
        console.log(result);
        const weatherArray = result.data.data.map(item=>{
        return new Forcast (item);
        });
        
        console.log('================');
        console.log('Save data into cache');
        console.log('================');

    cacheObject.forCast.push({
    "lat":lat,
    "lon":lon,
    "weatherArray":weatherArray
    
        });
        console.log('================');
        console.log(cacheObject);
        console.log('================');

      res.json(weatherArray);
      })
    }catch (error) {
      return error
    }
    }
  

}
    

  

  module.exports=getWeather;