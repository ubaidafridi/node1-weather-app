const request = require('request');

const forcast = (latitude,longitude,callback)=>{
const url = 'http://api.openweathermap.org/data/2.5/weather?q=karachi&appid=24414a7792910f133373af07c53a3458'
request({url , json : true}, (error,{body})=>{
    if(error){
        callback(error,undefined);
    }
    else if(body.error){
        callback('unable to find location')
    }
    else{
        callback( undefined,body.weather[0].description)
}
})
}
module.exports = forcast;