'use strict';

const Movie=require('../models/movie.model');


require("dotenv").config();
const axios= require("axios");

const getMovies=async (req, res) => {

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


  module.exports=getMovies;