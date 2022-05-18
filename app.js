require('dotenv').config();
// require('events').EventEmitter.prototype._maxListeners = 100;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors=require("cors");
const auth = require('./controllers/auth');
const post = require('./controllers/post');


// require('./config/mailchimp');
var indexRouter = require('./routes/index');
var mainRouter = require('./routes/post');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  console.log(process.env.MONGO_URI)
    if (err) return console.log('an error occurred', err);
    console.log('database connected');
    
});

var app = express();
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if(process.env.NODE_ENV !== 'development'){
  // Step 1:
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  // Step 2:
  app.get('/verify/:token', auth.verify)
  app.get('/posts',post.getAllPosts )
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( indexRouter);
app.use( mainRouter);


module.exports = app;
