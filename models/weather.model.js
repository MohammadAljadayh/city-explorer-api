'user strict'



class Forcast {

    constructor(item){
  
      this.date = item.valid_date;
      this.description = item.weather.description;
    }
  }




module.exports=Forcast;