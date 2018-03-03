// import { METHODS } from 'http';

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express(); // gọi function express

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();  
});
 
app.set('view engine','hbs');


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    next();
    fs.appendFile('sever.log',log + '\n');
});

// app.use((req, res, next)=>{
//    res.render('maintenance.hbs');
// });

app.use(express.static(__dirname +'/public'));

app.get('/',(req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home page',
        wellcomeMessage:'Wellcome to my website',
    });
});
 
app.get('/about',(req, res)=>{
    // res.send('About page'); in ra cau about page
    res.render('about.hbs',{
        pageTitle: 'About page change',
        currentYear: new Date().getFullYear()

    });
});
 
//bad - send a json with error massage
app.get('/bad',(req, res)=>{
    res.send({
        errorMessage: 'Unable to handle this request'
    })
});

app.listen(3000,()=>{
    console.log('Sever is up on port 3000');
});