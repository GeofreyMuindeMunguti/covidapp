const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const request = require('request');

 

app.set('view engine', 'ejs'); 

app.listen(3000, () =>{
    console.log("covidapp is running on port "+ 3000);
})

app.get('/', (req,res)=>{
    let graphd = [];
    let country = 'kenya';
    let controller = 'Kenya';
 

    request('https://api.covid19api.com/summary', (req,result)=>{
        request('https://api.covid19api.com/live/country/'+country, (request, graphdata)=>{
         
         const countryData = JSON.parse(graphdata.body);
         countryData.forEach(item=>{
             graphd.push(item.Confirmed);
         })

          

        if(controller==='Global'){
           

        res.render('index', {data: JSON.parse(result.body)[controller], gdata: graphd})
        }else{
            const entries = Object.entries(JSON.parse(result.body).Countries)
            entries.forEach(item=>{
                
                if(item[1].Country === controller){
                    
                    res.render('index', {data: item[1], gdata: graphd})
                }
            })
           
        }
    })
    }) 
    
})

app.get('/api', (req,res)=>{
    request('https://api.covid19api.com/summary', (request, result)=>{
        if(result){
        res.status(200).send(result.body);
        }
        else{
            res.status(500).send("An error occured");
        }
    })
})