const express = require('express');
const router = express.Router();
const UserFeedback = require('../model/userfeed');
const MerchantFeedback = require('../model/merchantfeed');
const mongoose = require('mongoose');
const db = "mongodb+srv://admin:admin@cluster0.ccigw.mongodb.net/spesadb?retryWrites=true&w=majority";
mongoose.connect(db, err => {
    if (err) {
        console.log('Error in connect the database' + err);
    } 
});

//Standard feedback API landing page
router.get('/',(req, res) => {
    res.send("Get all feedbacks");
});

//get all user Feedback
router.get('/user', (req, res) => {
    UserFeedback.find({}).sort({createdAt:-1}).then(
            result => {
                res.json({
                    feedback: result,
                    status: true
                })
            }
        ).catch(err => {
            res.json({
                message: 'Error in get request for  finding the userFeedback',
                status: false
            })
        })
    }
)

//add customer Feedback
router.post('/user', (req, res) => {
    let usrF = new UserFeedback()
    usrF._id = new mongoose.Types.ObjectId();
    usrF.feedback = req.body.feedback;
    usrF.save().then(
    result => {
        res.json({
            message: 'Feedback received.',
            status: true,
        })
    }).catch(
    error => {
        console.log(error)
        res.json({
           message: 'user feedback not added',
           status: false,
        })
    })
});

//Delete a User Feedback
router.delete('/user/:id', (req, res) => {
    UserFeedback.findByIdAndRemove(req.params.id).then(
        result => {
            res.json({
                message: 'Feedback deleted successfully',
                status: true,
            })
        }).catch(
            error => {
                res.json({
                    message: 'Feedback deletion failed',
                    status: false,
                })
            }
        )}
    )

//Get all Merchant Feedbacks
router.get('/merchant', (req, res) => {
    MerchantFeedback.find({}).sort({createdAt:-1}).then(
            result => {
                res.json({
                    feedback: result,
                    status: true
                })
            }
        ).catch(err => {
            res.json({
                message: 'Error in get request for  finding the Merchant Feedback',
                status: false
            })
        })
    }
)

//add Merchant Feedback
router.post('/merchant', (req, res) => {
    let mF = new MerchantFeedback()
    mF._id = new mongoose.Types.ObjectId();
    mF.feedback = req.body.feedback;
    mF.save().then(
    result => {
        res.json({
            message: "Feedback recorded",
            status: true,
        })
    }).catch(
    error => {
        console.log(error)
        res.json({
           message: "Feedback couldn't be recorded",
           status: false,
        })
    })
});

//Delete a Merchant Feedback
router.delete('/merchant/:id', (req, res) => {
    MerchantFeedback.findByIdAndRemove(req.params.id).then(
        result => {
            res.json({
                message: 'Feedback deleted successfully',
                status: true,
            })
        }).catch(
            error => {
                res.json({
                    message: 'Feedback deletion failed',
                    status: false,
                })
            }
        )}
    )

module.exports = router;