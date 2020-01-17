const router = require('express').Router();
//njbi eldb object mel database
const db = require('../config/database');
//njib el userDAO
const userDAO=require('../dao/userDAO');




//get list of all users
router.get('/', (req, res) =>{
    //nasna3 userDao w naadilou el db object
    var userDao=new userDAO(db);
    //ne5tar elfonction elli nheb aliha mel userDao 
    userDao.list((err,users)=>{
        if(err)return res.status(404).json({
            "Error":err.message
        })
        else{
            return res.status(200).json(users);
        }
    }) 
});


//get user with id
router.get('/:id',(req,res)=>{
   var id=req.params.id;
   var userDao=new userDAO(db);
   userDao.getUser(id,(err,user)=>{
       if(err)return res.status(404).json({
            "Error":err.message
       })
       else{
           return res.status(200).json(user);
       }
   })
});

module.exports = router;