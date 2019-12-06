const router = require('express').Router();
//const db = require('../config/database');
const User = require('../models/User');

// Login
router.post('/login', (req, res) => res.sendStatus(200))

// Register
router.post('/register', (req, res) => { 
    console.log(req.body);
    res.sendStatus(200);
}
    // User.create({username:'test', password:' xdd'})
    //     .then(user => {
    //         console.log(user);
    //         res.sendStatus(200);
    //     })
    //     .catch(err => console.log(err))
        );


router.get('/', (req, res) =>
    User.findAll()
    .then(users => {
        console.log(users);
        res.sendStatus(200);
    })
    .catch(err => console.log(err)))

module.exports = router;