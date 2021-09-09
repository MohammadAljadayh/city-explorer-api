'use strict';
const express = require("express");
const app = express();
const weatherData = require("./Data/weather.json");
const axios= require("axios");
const cors = require("cors");
const { response } = require("express");
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT;


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

class Movies {
constructor(title,overview,vote,count)
{
this.title=title;
this.overview=overview;
this.vote=vote;
this.count=count;

}

}
// app.get("/weather",(req, res) => {

//   console.log("I Am weather");
//   let city_name=req.query.city_name;
//   let lat=req.query.lat;
//   let lon=req.query.lon;

// const returnArray=weatherData.find((item) => {
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
// });

const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
app.get('/weather', async (request, response) => {

 const city_name=request.query.city_name;
  const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    const weatherBitResponse = await axios.get(`${weatherBitUrl}?city_name=${city_name}&key=${WEATHER_API_KEY}`);

    if (city_name) {
      let arr1=weatherBitResponse.data.data.map((data1)=> {
        return new Forecast(
    `low of ${data1.low_temp}, high of ${data1.high_temp} with ${data1.weather.description}`,`${data1.datetime}`
    
        );
    
      });

      if (arr1.length){
    response.json(arr1);
      } else {
        response.send('erorr: Something went wrong');
      }
    }else{
      response.send('erorr: Something went wrong');
    }
    
});


const MOVIES_API_KEY=process.env.MOVIES_API_KEY;

app.get('./movies',async (req,res)=>{

  const city_name=req.query.query;

  const movie='https://api.themoviedb.org/3/search/movie';
  const movieResponse=await axios.get(`${movie}?query=${city_name}&api_key=${MOVIES_API_KEY}` );

 



if (city_name) { 
 
let arr1=movieResponsed.data.results.map((data1) => {
return new Movies (
`Title: ${data1.title}`,
`Overview: ${date1.overview}`,
`Average votes: ${date1.vote_average}`,
`Total Votes: ${date1.vote_count}`
);
});

if(arr1.length){
  response.json(arr1);
}else {
  response.send('erorr somthing went wrong');
}

}
else {
  response.send('erorr somthing went wrong');
}
});

app.get("*", (req, res) => {
  res.status(404).send("sorry, this page not found");
});

app.listen(PORT,() => {
  console.log(`Listening on PORT ${PORT}`);
});