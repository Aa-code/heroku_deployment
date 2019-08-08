const express = require('express');
const router = express.Router();

const Product = require('../models/store')




router.get('/seed', async (req, res) => {
    const newProducts =
      [
        {
          name: 'Manuka Honey & Yogurt Hydrate + Repair Protein-Strong Treatment 8OZ',
          description: 'a nutrientrich strengthening cream to naturally reinforce and revitalize over-processed, abused hair fibers. Certified organic Shea Butter, ultra-moisturizing Manuka Honey and Yogurt in a deep conditioning formula that fortifies weak strands.',
          img: 'https://www.sheamoisture.com/dw/image/v2/BDFL_PRD/on/demandware.static/-/Sites-sundial-master-catalog/default/dwc3e2c497/large/sheamoisture/764302231479_image%204.jpg?sw=560&sh=560&sm=cut',
          price: 10.99,
          qty: 30
        }, {
          name: 'SheaMoisture coconut & Hibisus Curl and Shine Shampoo',
          description: 'Sulfate free hair product combines hand picked natural ingridents and certified organic Shea butter to create a gentle cleanser which improves hair health! This is perfect for those with curly hair and want to regain their natural bounce!.',
          img: 'https://www.sheamoisture.com/dw/image/v2/BDFL_PRD/on/demandware.static/-/Sites-sundial-master-catalog/default/dw528dc1f5/large/sheamoisture/764302290209_image%204.jpg?sw=560&sh=560&sm=cut',
          price: 10.99,
          qty: 100
        }, {
          name: 'Yucca & Plantain Anti-Breakage Strengthening Shampoo',
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





//index
router.get('/', (req, res)=> {
    Product.find({}, (err, findall) => {
        res.render('index.ejs', {
            storeKey: findall
        })
    })
})


//new route 
router.get('/new', (req, res)=> {
    res.render('new.ejs')
})


//show route
router.get('/:id', (req, res)=>{
    Product.findById(req.params.id, (err, founditem)=>{
        res.render('show.ejs', {
            storeID: founditem
        });
    });
});


// EDIT
router.get('/:id/edit', (req, res) => {
   
    Product.findById(req.params.id, (err, editStore ) => {
        console.log(editStore)
    res.render( 'edit.ejs', { 
        Product: editStore, 
       
      })
    })
  })


  //   post route goes with my new 
router.post('/', (req, res)=> {
    Product.create(req.body, (error, createdStore) => {
        if (error) {
           
            res.send(error)
        } else {
            res.redirect('/store');
        }
      
    });
})

//Delete route
router.delete('/:id', async (req, res)=> {
    //add mongoose logic!
    Product.findByIdAndRemove(req.params.id, (error, deleteditem) => {
        if (error) {
            console.log(error);
        } else {
            console.log('deleted',deleteditem)
            res.redirect('/store')
        }    
    });
})


// update!! 
router.put('/:id', (req, res)=>{
    // logic to edit fruit using mongoose
      Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updateditem)=>{
          if (err) {
              console.log(err)
          } else {
              res.redirect('/store');
          }
      
      });
  });




  // buy

router.put('/:id/buy', (req, res)=> {
    Product.findByIdAndUpdate(req.params.id,{ $inc:{qty: -1}}, (err, buybtn)=> {
      
        if (err) {
            console.log(err)
        }else {
            res.redirect(`/store/${req.params.id}`)
        }
    })

})





module.exports = router;