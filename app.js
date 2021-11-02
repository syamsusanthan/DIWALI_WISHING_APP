const express = require('express');
const port =process.env.PORT || 4500;
var engines= require('consolidate');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path =require('path');
const nodemailer = require('nodemailer');
const hbs =require('nodemailer-express-handlebars');
const app =express();
app.engine('ejs',engines.ejs);
app.engine('handlebars',engines.handlebars);
//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.render('diwali')
})
app.get('/greet', (req,res)=>{
    
    var data={
        name:req.query.name,
        mail:req.query.email
    }
    res.render('greet',{data})
})
app.get('/new', (req,res)=>{
    
    var data={
        name:req.query.name
    }
    res.render('new',{data})
})
app.post('/greet',(req,res)=>{
    let transporter = nodemailer.createTransport({
    service:'hotmail',
    auth: {
        user: 'syam4node@outlook.com',
        pass: 'syam4@OUTLOOK'
    }
});



let mailOptions={
    from: 'syam4node@outlook.com',
    to: req.body.mail,
    subject: 'DIWALI GREETINGS',
    text:"Happy Diwali"+req.body.name,
    html:'Happy Diwali ' +req.body.name+'<h1> Click <a href="https://syamsusanthan.github.io/DIWALI_CARD/">here</a></h1>',

};

transporter.sendMail(mailOptions, function(err,data){
    if(err){
        console.log("Error occured"+err);
    } else{
        console.log("Email sent");
    }
});
res.redirect('/');
})
app.listen(port, ()=>{console.log("server ready at"+port)});