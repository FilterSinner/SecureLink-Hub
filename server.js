//http server
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');
const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//logs requests on console
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs") //ejs -html,pug template engine
//app.set("views",path.resolve(__dirname,"views/ejs"))

//load assetsw
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
//app.use('/utils',express.static(path.resolve(__dirname,"server/utils")))
//if you need to acces a file path: 
//css/style.css 

//load routers
app.use('/',require('./server/routes/router'))



app.listen(PORT,()=>{ 
    console.log(`Server is running on http://localhost:${PORT}`)
})