'use strict';

class Cache {

    constructor(data){
        this.forCast=[];
        this.movies = [];
        this.timeStamp = Date.now();
    }
}

module.exports=Cache;


/**
 * -------------------------
 * cache object Example
 * -------------------------
 * new Cache()
 * -------------------------
 * the data will look like this
 * -------------------------
 * {
 *  foreCast: [
 *   { //zaraq
 *     lon:'',
 *     lat: '',
 *     data: []
 *   },
 *  {   //irdid
 *   lon: '',
 *   lat: '',
 *   data: []
 *  }
 *  ]
 *
 *
 * }
 */