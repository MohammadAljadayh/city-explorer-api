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

const getWeather=require('./controller/weather.controller');

const getMovies=require('./controller/movie.controller');

const index=require('./controller/index.controller');




app.get('/',index);

app.get('/weather',getWeather );

app.get('/movies',getMovies);

app.get("*", (req, res) => {
  res.status(404).send("sorry, this page not found");
});

app.listen(PORT,() => {
  console.log(`Listening on PORT ${PORT}`);
});