const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');
const mongoose = require('mongoose');
const db = "mongodb+srv://admin:admin@cluster0.ccigw.mongodb.net/spesadb?retryWrites=true&w=majority";
mongoose.connect(db, err => {
    if (err) {
        console.log('Error in connect the database' + err);
    } 
});

//standard analytics API landing page
router.get('/', (req, res) => {
    res.send('Welcome to Analytics API');
});

//get Total Transactions
router.get('/tTrans', (req, res) => {
    Customer.count({}, function(err, count){
    res.json(count);
    });
});

//average Basket size
router.get('/avgBasket', (req, res) => {
    Customer.find({}, function(err, customers){
        var total = 0;
        for(var i = 0; i < customers.length; i++){
            total += customers[i].itemList.length;
        }
        var avg = total / customers.length;
        res.json({
            avg: avg,
            total: total
        });
    });
});

function findOcc(arr, key){
  let arr2 = [];
    
  arr.forEach((x)=>{
       
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == x[key] })){
         
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
            k["price"] = x["price"];
           k["occurrence"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = x[key]
        a["price"] = x["price"];
       a["occurrence"] = 1
       arr2.push(a);
     }
  })
  arr2.sort((a, b) => {
        return  b.occurrence - a.occurrence;
    });
    
  return arr2
}

router.get('/mostScanned', (req, res) => {
    var arr = [];

    Customer.find({}, function(err, customers){ 
        for(var i = 0; i < customers.length; i++){
            let a = customers[i].itemList.filter((item)=> item.brand !== null)
            // .map((item)=> ["name"].reduce((acc, key)=> {
            //         acc = item[key];
            //         return acc;
            //     }, {}));
            arr = arr.concat(a);
        }
        totalItems = arr.length;
        // const occurrences = arr.reduce(function (acc, curr) {
        //             return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        //             }, {});
        
        res.json({
            total: totalItems,
            occurrences: findOcc(arr, "name")
        });
    });
});

router.get('/TransactionSeries', async (req, res)=>{
    let docs = await Customer.aggregate([
    {
            $group : {
            _id :{ $dateToString: { format: "%Y,%m,%d", date: "$createdAt"} },
            list: { $push: "$$ROOT" },
            count: { $sum: 1 }
            }
        }
    ]);
    var data = [];
    docs.sort(function(a, b) {
        var c = new Date(a._id);
        var d = new Date(b._id);
        return c-d;
    });

    docs.map(item=>{
        data.push([item._id, item.count]);
    })
    res.json({
        data
    });
})

module.exports = router;