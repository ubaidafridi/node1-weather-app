const request = require('request');
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGFkdWFuY2xlIiwiYSI6ImNrZTJwdGZpcTBiajQzMHA4M2YxMmJ5ZHgifQ.Dp5hkwpyQLRDv6hZWExYlg&limit=1';
    request({url : url, json : true},(error , {body})=>{
        if(error){
            callback('Unable to connect to an internet');
        } else if(body.features.length===0){
            callback('unable to find location');
        }
        else{
            callback(undefined,{
                latitude :body.features[0].center[0],
                longitude :body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
    })
    
}
module.exports = geocode;