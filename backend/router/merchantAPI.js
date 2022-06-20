const express = require('express');
const router = express.Router();
const MerchantUser = require('../model/merchantUser');
const Barcode = require('../model/barcode');
const WeightProduct = require('../model/weightProduct');
const mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
const db = "mongodb+srv://admin:admin@cluster0.ccigw.mongodb.net/spesadb?retryWrites=true&w=majority";
mongoose.connect(db, err => {
    if (err) {
        console.log('Error in connect the database' + err);
    } 
});

//Standard Merchant API landing page
router.get('/', (req, res) => {
    res.send("From Merchant router")
});

//get all the barcode items
router.get('/barcode', (req, res) => {
    Barcode.find({}).then(
            result => {
                res.json({
                    barcodes: result,
                    status: true
                })
            }
        ).catch(err => {
            res.json({
                message: 'Error in get request finding the barcodes',
                status: false
            })
        })
    }
)

//add barcode item
router.post('/barcode', (req, res) => {
    Barcode.find({"upc": req.body.upc})
        .then(
            result => {
                if (result.length !== 0) {
                    res.json({
                        message: 'Item already exists',
                        status: false
                    })
                } else {
                    let item = new Barcode()
                    item._id = new mongoose.Types.ObjectId();
                    item.upc = req.body.upc;
                    item.name = req.body.name;
                    item.brand = req.body.brand;
                    item.weight = req.body.weight;
                    item.price = req.body.price;
                    item.image = req.body.image;
                    item.save().then(
                    result => {
                        res.json({
                            message: 'item added successfully',
                            status: true,
                            barcodes: result
                        })
                    }).catch(
                    error => {
                        console.log(error)
                        res.json({
                           message: 'Item addition mongoose save failed',
                           status: false,
                        })
                    })
                }
            }
        )
        .catch(
            error => {
                res.json({
                    message: 'Item addition post request fail',
                    status: false,

                })
            }
        )
    }
);

//update the barcode item
router.put('/barcode', (req, res) => {
    Barcode.findByIdAndUpdate(req.body._id, {
        "upc": req.body.upc,
        "name": req.body.name,
        "brand": req.body.brand,
        "weight": req.body.weight,
        "price": req.body.price,
        "image": req.body.image
    }).then(
        result => {
            if(result.length !== 0) {
            res.json({
                message: 'Item updated successfully',
                status: true,
                })
            } else {
                res.json({
                    message: 'Item not found',
                    status: false,
                })
            }
        }
    ).catch(
        error => {
            res.json({
                message: 'Item update failed',
                status: false,
            })
        }
    )
});

//Delete a Barcode Item
router.delete('/barcode/:id', (req, res) => {
    Barcode.findByIdAndRemove(req.params.id).then(
        result => {
            res.json({
                message: 'Item deleted successfully',
                status: true,
            })
        }).catch(
            error => {
                res.json({
                    message: 'Item deletion failed',
                    status: false,
                })
            }
        )}
    )

//get all the weighed Products
router.get('/weightProduct', (req, res) => {
    WeightProduct.find({}).then(
            result => {
                res.json({
                    products: result,
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

//add weight item
router.post('/weightProduct', (req, res) => {
    WeightProduct.find({"name": req.body.name})
        .then(
            result => {
                if (result.length !== 0) {
                    res.json({
                        message: 'Item already exists',
                        status: false
                    })
                } else {
                    let item = new WeightProduct()
                    item._id = new mongoose.Types.ObjectId();
                    item.name = req.body.name;
                    item.brand =req.body.brand;
                    item.price = req.body.price;
                    item.image = req.body.image;
                    item.gst = req.body.gst;
                    item.save().then(
                    result => {
                        res.json({
                            message: 'Item added successfully',
                            status: true,
                            products: result
                        })
                    }).catch(
                    error => {
                        console.log(error)
                        res.json({
                           message: 'weighed product moongose addition failed',
                           status: false,
                        })
                    })
                }
            }
        )
        .catch(
            error => {
                res.json({
                    message: 'Weighed Product addition post request fail',
                    status: false,

                })
            }
        )
    }
);

//update the weight product item
router.put('/weightProduct', (req, res) => {
    WeightProduct.findByIdAndUpdate(req.body._id, {
        "name": req.body.name,
        "brand": req.body.brand,
        "price": req.body.price,
        "image": req.body.image
    }).then(
        result => {
            res.json({
                message: 'Item updated successfully',
                status: true,
            })
        }
    ).catch(
        error => {
            res.json({
                message: 'Item update failed',
                status: false,
            })
        }
    )
});

//delete the weight product item
router.delete('/weightProduct/:id', (req, res) => {
    WeightProduct.findByIdAndRemove(req.params.id).then(
        result => {
            res.json({
                message: 'Item deleted successfully',
                status: true,
            })
        }).catch(
            error => {
                res.json({
                    message: 'Item deletion failed',
                    status: false,
                })
            }
        )}
    )


//get User Info from id
router.get('/user/:id', (req,res) => {
    MerchantUser.findById(req.params.id).then(
        result => {
            res.json({
                isMerchant: result.isMerchant,
                status: true
            })
        }
    ).catch(
        error => {
            res.json({
                message: 'Error in get request finding the user',
                status: false
            })
        }
    )
});

router.get('/user',(req,res) => {
    MerchantUser.find({}).then(
        result => {
            res.json({
                users: result,
                status: true
            })
        }
    ).catch(
        error => {
            res.json({
                message: 'Error in get request finding the user',
                status: false
            })
        }
    )
});

//Deals with the registration of the merchant user
router.post('/register', (req, res) => {
    if(`${req.body.password}`.length < 6){
        console.log("password is too short");
        res.json({
            status: false,
            message: 'Password must be at least 6 digits'
        })
    }
    else {
    MerchantUser.find({"email": req.body.email}).then(
            result => {
                if (result.length !== 0) {

                    res.json({
                        message: 'Email already exists',
                        status: false
                    })
                } else {
                    let user = new MerchantUser();
                    user.merchant = req.body.merchant;
                    user.username = req.body.userName;
                    user.email = req.body.email;
                    user.setPassword(req.body.password);
                    user._id = new mongoose.Types.ObjectId()
                    user.phone = req.body.phone;
                    user.save()
                        .then(
                            result => {
                                res.json({
                                    user_id: result._id,
                                    merchant: result.merchant,
                                    username: result.userName,
                                    userEmail: result.email,
                                    message: 'User Registration success',
                                    status: true,
                                    isMerchant: result.isMerchant,
                                })
                            }
                        )
                        .catch(
                            error => {
                                console.log(error)
                                res.json({
                                   message: 'User Register fail',
                                   status: false,
                                })
                            }
                        )
                }
            }
        )
        .catch(
            error => {
                console.log(error);
                res.json({
                    message: ' User Register fail',
                    status: false,

                })
            }
        )
    }
});

//Deals with the login of the merchant user
router.post('/login', (req, res) => {
    MerchantUser.findOne({"email": req.body.email})
        .then(
            result => {
                if (result !== null) {       
                    if(result.validPassword(req.body.password)) {
                        res.json({
                            user_id: result._id,
                            username: result.userName,
                            merchant: result.merchant,
                            userEmail: result.email,
                            message: 'User login success',
                            status: true,
                            isMerchant: result.isMerchant,
                        })
                    } else {
                        res.json({
                           message: 'User Login unsuccessful',
                           status: false,
                        })
                    }
                } else{
                    res.json({
                        message: 'User login Unsuccessful',
                        status: false
                    })
                }
            }
        )
        .catch(
            error => {
                console.log(error);
                res.json({
                    message: ' User login fail',
                    status: false,

                })
            }
        )
});

//User update
router.put('/user/:id', (req, res) => {
    MerchantUser.findByIdAndUpdate(req.params.id, {
        "isMerchant" : req.body.isMerchant,
        "username": req.body.contactName,
        "merchant": req.body.merchant,
        "email": req.body.email
    }).then(
        result => {
            if(result !== null) {
                res.json({
                    message: 'User updated successfully',
                    status: true,
                })
            } else {
                res.json({
                    message: 'User not updated',
                    status: false,
                })
            }
        }
    ).catch(
        error => {
            res.json({
                message: 'User update failed',
                status: false,
            })
        }
    )
});

//delete a merchant from the DB
router.delete('/user', (req, res) => {
    MerchantUser.findByIdAndRemove(req.body._id).then(
        result => {
            res.json({
                message: 'User deleted successfully',
                status: true,
            })
        }).catch(
            error => {
                res.json({
                    message: 'User deletion failed',
                    status: false,
                })
            }
        )
});



module.exports = router;