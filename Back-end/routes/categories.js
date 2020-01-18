const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const categoryDAO=require('../dao/categoryDAO');
const db=require('../config/database');



//list of categories
router.get('/list', (req, res) => {
    var categoryDao=new categoryDAO(db);
    categoryDao.list((err,categories)=>{
        if(err)return res.status(404).json({
            'Error':err.message
        });
        else return res.status(200).json(categories);
    })
})

//Get category
router.get('/:categoryId', (req, res) => {
    var categoryDao=new categoryDAO(db);
    var categoryId=req.params.categoryId;
    categoryDao.get(categoryId,(err,category)=>{
         if(err)return res.status(401).json({'Error':err.message});
         else return res.status(200).json(category);
    })
})

//Create category
router.post('/add',[ check('name').exists().notEmpty()], (req, res) => {
    console.log("hellohhhhhhhhhhhhhhhhhhhhhhhhh");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    var categoryDao=new categoryDAO(db);
    var category=req.body;
    categoryDao.create(category,(err,createdCategory)=>{
        if(err)return res.status(401).json({
            "Error":err.message
        });
        else return res.status(200).json(createdCategory);
    });
});


module.exports = router;


