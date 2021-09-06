'use strict';
const express = require("express");
const server = express();
const weatherData = require("./Data/weather.json");
const axios= require("axios");
const cors = require("cors");
server.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 3080;


server.get("/", root);

server.get("/cityName",city);

server.get("/forcast",wether);


function root(req, res) {
  res.send("Hello you are in the root , ");
}

function city(req, res) {
  res.send("Hello you are in City Get Part");
}

function wether(req, res){
  res.send("Hello you are in the forcast Part");

}

 server.get("*", (req, res) => {
  res.status(404).send("sorry, this page not found");
});

server.listen(process.env.PORT || 3080, () => {
  console.log(`Listening on PORT ${PORT}`);
});