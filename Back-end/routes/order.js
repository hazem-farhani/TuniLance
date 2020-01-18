const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const orderDAO=require('../dao/orderDAO');
const db=require('../config/database')


//list of user orders
router.get('/list', (req, res) => {
    var orderDao=new orderDAO(db);
    var user=req.user;
    orderDao.list(user,(err,skills)=>{
        if(err)return res.status(404).json({
            'Error':err.message
        });
        else return res.status(200).json(skills);
    })
})

//Get order
router.get('/:orderId', (req, res) => {
    var orderDao=new orderDAO(db);
    var user=req.user;
    var orderId=req.params.orderId
    orderDao.get(user,orderId,(err,order)=>{
         if(err)return res.status(401).json({'Error':err.message});
         else return res.status(200).json(order);
    })
})

//Create skill
router.post('/add', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    var orderDao=new orderDAO(db);
    var order=req.body;
    var user=req.user;
    orderDao.create(user,order,(err,createdOrder)=>{
        if(err)return res.status(401).json({
            "Error":err.message
        });
        else return res.status(200).json(createdOrder);
    });
})

//Update order
router.put('/update/:orderId', validationRules('createComment'), validate, (req, res) => {
    var newOrder = req.body;
    var orderDao=new orderDAO(db);
    var user=req.user;
    var orderId=req.params.orderId;
    if(orderId!=newOrder.id)return res.status(400).json({"Error":"you cannot update this comment"})
    orderDao.update(user,order,(err,updatedOrder)=>{
        if(err)return res.status(400).json({
            "Error":err.message
        });
        else return res.status(200).json(updatedOrder);
    });
})


//Delete skill
router.delete('/delete/:orderId', (req, res) => {
    var orderDao=new orderDAO(db);
    var user=req.user;
    var orderId=req.params.orderId;
    orderDao.remove(user,orderId,(err,order)=>{
         if(err)return res.status(401).json({'Error':err.message});
         else return res.status(200).json({"Message":"skill deleted successfully"});
    })
})

module.exports = router;