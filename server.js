//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const app = express ();
const methodOverride = require('method-override');



//DATA
// const Product = require('./models/store')
const storeController = require('./controllers/store_router');

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use('/store', storeController)

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Heroku_store'


// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
	console.log('connected to mongo database')
});

//___________________
// Routes
//___________________
//localhost:3000





//heroku


app.get('/', (req,res) => res.redirect('/store'))




//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port:', PORT));