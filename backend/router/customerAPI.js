const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');
const mongoose = require('mongoose');
const db = "mongodb+srv://admin:admin@cluster0.ccigw.mongodb.net/spesadb?retryWrites=true&w=majority";
const stripe = require("stripe")("sk_test_51JgidXHATUuIHCc6bKpHVLaSfzLz7EGVSrV6hr2gvypHsduS7afJnOoIOtuqlC5BvCAjTi2f8PfgvBk31fuNppQR00Z3hBzM4r");
mongoose.connect(db, err => {
    if (err) {
        console.log('Error in connect the database' + err);
    } 
});

//Standard Customer API landing page
router.get('/',(req, res) => {
    res.send("Get all customers carts");
});

//Get all customers carts
router.get('/cart', (req, res) => {
    Customer.find({}).sort({createdAt:-1}).then(
            result => {
                res.json({
                    cartDetails: result,
                    status: true
                })
            }
        ).catch(err => {
            res.json({
                message: 'Error in get request for  finding the weightProduct',
                status: false
            })
        })
    }
)

//get customer cart by id
router.get('/cart/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(
        result => {
            res.json({
                cartDetails: result,
                status: true
            })
        }).catch(err => {
        res.json({
            message: 'Error in get request for  finding the weightProduct',
            status: false
        })
    })
});


//add customer cart item
router.post('/cart', (req, res) => {
    let cart = new Customer()
    cart._id = new mongoose.Types.ObjectId();
    cart.itemList = req.body.itemList;
    cart.subTotal = req.body.subTotal;
    cart.promoCode = req.body.promoCode;
    cart.tax = req.body.tax;
    cart.total = req.body.total;
    cart.save().then(
    result => {
        res.json({
            _id: result._id,
            message: 'item added successfully',
            status: true,
        })
    }).catch(
    error => {
        console.log(error)
        res.json({
           message: 'Cart moongose addition failed',
           status: false,
        })
    })
});

router.post("/create-payment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  console.log(paymentIntent);
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});


module.exports = router;