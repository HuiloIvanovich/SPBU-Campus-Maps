const express = require('express');
const router = express.Router();
const axios = require('axios');

const User = require('../../models/User');

// @route   GET api/users/current
// @desc    Get current user's study group
// @access  Public
router.get('/current', async (req, res) => {
    if(!req.query.user_id) {
        res.status(400).json({error: "No user id specified"})
    }
    const user = await User.findOne({user_id: req.query.user_id});
    if(!user) {
       //User doesn't exist
       return res.json({error: "User doesn't exist"});
    } else {
       return res.json({msg: 'Success', study_group: user.study_group});
    }
});

// @route   POST api/users/register
// @desc    Get current user's study group
// @access  Public
router.post('/register', async (req, res) => {
    if(!req.body.study_group || !req.body.user_id) {
        //Shouldn't be here
        return res.status(400).json({error: "No study group or user id specified"});
    }
    let user = new User;
    user.user_id = req.body.user_id;
    user.study_group = req.body.study_group;
    await User.updateOne({user_id: req.body.user_id}, {study_group: req.body.study_group}, {upsert: true});
    return res.json({msg: 'Success', study_group: user.study_group});
});

router.get('/test', async (req, res) => {

});

module.exports = router;


