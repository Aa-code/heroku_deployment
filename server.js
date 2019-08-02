//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const app = express ();
const methodOverride = require('method-override');



//DATA
const Product = require('./models/store')

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
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



app.get('/seed', async (req, res) => {
    const newProducts =
      [
        {
          name: 'MANUKA HONEY & YOGURT HYDRATE + REPAIR PROTEIN-STRONG TREATMENT 8OZ',
          description: '.',
          img: 'https://www.sheamoisture.com/dw/image/v2/BDFL_PRD/on/demandware.static/-/Sites-sundial-master-catalog/default/dwc3e2c497/large/sheamoisture/764302231479_image%204.jpg?sw=560&sh=560&sm=cut',
          price: 5,
          qty: 11.99
        }, {
          name: 'SheaMoisture coconut & Hibisus Curl and Shine Shampoo',
          description: 'Sulfate free hair product combines hand picked natural ingridents and certified organic Shea butter to create a gentle cleanser which improves hair health! This is perfect for those with curly hair and want to regain their natural bounce!.',
          img: 'https://www.sheamoisture.com/dw/image/v2/BDFL_PRD/on/demandware.static/-/Sites-sundial-master-catalog/default/dw528dc1f5/large/sheamoisture/764302290209_image%204.jpg?sw=560&sh=560&sm=cut',
          price: 10.99,
          qty: 100
        }, {
          name: 'YUCCA & PLANTAIN ANTI-BREAKAGE STRENGTHENING SHAMPOO',
          description: 'Sulfate free shampoo, Smooths hair cuticles to reduce frizz and improve split ends. Certified organic shea butter, Plantainnd yucca combined. Boabab Oil and Cilantro extract help refresh and boost shine',
          img: 'https://www.sheamoisture.com/dw/image/v2/BDFL_PRD/on/demandware.static/-/Sites-sundial-master-catalog/default/dw0d75b901/large/sheamoisture/764302210207_image%201.jpg?sw=560&sh=560&sm=cut',
          price: 10.99,
          qty: 60
        }
      ]
  
    try {
      const seedItems = await Product.create(newProducts)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
  })


//heroku
app.get('/' , (req, res) => {
  res.send('app is running!');
});
app.get('/', () => res.redirect('/fruits'))


//index
app.get('/store', (req, res)=> {
    Product.find({}, (err, findall) => {
        res.render('index.ejs', {
            storeKey: findall
        })
    })
})


//new route 
app.get('/store/new', (req, res)=> {
    res.render('new.ejs')
})


//show route
app.get('/store/:id', (req, res)=>{
    Product.findById(req.params.id, (err, founditem)=>{
        res.render('show.ejs', {
            storeID: founditem
        });
    });
});


// EDIT
app.get('/store/:id/edit', (req, res) => {
   
    Product.findById(req.params.id, (err, editStore ) => {
    res.render( 'edit.ejs', { 
        Product: editStore, 
       
      })
    })
  })







//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port:', PORT));