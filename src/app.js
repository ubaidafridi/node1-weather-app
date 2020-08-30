
const path = require('path');
const express= require('express')
const hbs= require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const { query } = require('express');
const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../Templates/views')
const partialPath= path.join(__dirname,'../Templates/partials');

app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index',({
    title: 'Weather App',
    name :"ubaid khan"
    }));
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:' About Me',
        name : 'sirtaj'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"hay how we can help you",
        title:'Help page',
        name : 'ubaido'

    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must need to provide an address"
        })
    }
    geocode(req.query.address,(error, { latitude,longitude, location})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast : forcastData,
                location,
                address: req.query.address
            })
        })
    })
   
    // res.send({
    //     forcast:"rainy day",
    //     location:'kohat',
    //     address: req.query.address
    // });
    })
 
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        product :[]
    })
})    

app.listen(port,()=>{
    console.log('listening on port 3000');
})