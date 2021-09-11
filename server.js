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

let arr =[];
app.get("/",
function (req, res) {
  res.send("Hello you are in the root , ");
});


class Forcast {

  constructor(item){

    this.date = item.valid_date;
    this.description = item.weather.description;
  }
}

// class Movies {
// constructor(title,overview,vote,count)
// {
// this.title=title;
// this.overview=overview;
// this.vote=vote;
// this.count=count;

// }

// }
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

app.get('/weather', async (req, res) => {

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
  

})

app.get('/movies', async (req, res) => {

    let cityName = req.query.cityName;
    let key = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=43fd38f2ebaf3bc016d57a025b1ffd92&query=${cityName}`;
    // https://api.themoviedb.org/3/search/movie?api_key=43fd38f2ebaf3bc016d57a025b1ffd92&query=amman
    axios.get(url).then(result =>{
        const movieArray = result.data.results.map(item=>{
        return new Movie (item);
        })
    res.send(movieArray);
    })
    .catch(err =>{
      res.send(`there is an error in getting the data => ${err}`);
    })
  }
)
class Movie {
    constructor(item) {
        this.original=item.original_title;
        this.overview=item.overview;
        this.averageVotes=item.vote_average;
        this.totalVotes=item.total_votes;
         this.imagel=`https://image.tmdb.org/t/p/original${item.poster_path}`;
         this.popularity=item.popularity;
        this.releasedOn=item.release_date;
    }
    }

app.get("*", (req, res) => {
  res.status(404).send("sorry, this page not found");
});

app.listen(PORT,() => {
  console.log(`Listening on PORT ${PORT}`);
});