//loads the dependencies for the api
const path = require('path');
const express = require('express');
const handlebars = require('hbs');
const ipInformation = require('./utils/ip.js');

const port = process.env.PORT || 5000

var callingIpInformation;
var info;
var city;

//creates a new express request.
const app = express();

//global variables for the configuration of templating engine and views.
const publicDirectory = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views/');
const partialsPath = path.join(__dirname, './templates/partials');

//sets all the neccessary configuration required for the application.
app.set('view engine', 'hbs');
app.set('views', viewsPath)

//registers partials in handlebars.
handlebars.registerPartials(partialsPath);

//sets up the directory for the static files
app.use(express.static(publicDirectory));

//All of the functions below are routes for the application and renders different files based on the route requested by the user.
app.get('/', async (req,res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip)
    callingIpInformation = () => ipInformation(ip)
    .then(({data: {information}}) => { 
        city = information.city;
    })
    .catch(err =>  { throw new Error(err.message) });
    await callingIpInformation();
    res.render('index', {
        title: 'Weather',
        name: 'Megh Agarwal',
        city: city,
    });
});

app.get('/json', async (req,res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    callingIpInformation = () => ipInformation(ip)
    .then(({data: {information}}) => { 
        city = information.city;
    })
    .catch(err =>  { throw new Error(err.message) });
    await callingIpInformation();
    res.render('json', {
        title: 'JSON',
        name: 'Megh Agarwal',
        city: city
    });
})

app.get("/info", async (req,res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    callingIpInformation = () => ipInformation(ip)
    .then(({data: {information}}) => { 
        info = information;
    })
    .catch(err =>  { throw new Error(err.message) });
    await callingIpInformation();
    info = JSON.stringify(info, undefined, 4);
    res.render('info', {
        title: 'Info',
        name: 'Megh Agarwal',
        info: info
    });  
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Megh Agarwal'
    });
})

app.get('*', (req,res) => {
    res.render('404');
})

//The app listens to the port 3000.
app.listen(port, () => {
    console.log("Server running on port 5000");
})
