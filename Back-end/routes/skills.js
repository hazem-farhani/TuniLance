const router = require('express').Router();
const { Skill } = require('../config/database');
const {check, validationResult} = require('express-validator');
const skillDAO=require('../dao/skillDAO');
const db=require('../config/database')


//list of skills
router.get('/list', (req, res) => {
    var skillDao=new skillDAO(db);
    var user=req.user;
    skillDao.list(user,(err,skills)=>{
        if(err)return res.status(404).json({
            'Error':err.message
        });
        else return res.status(200).json(skills);
    })
})

//Get skill
router.get('/:skillId', (req, res) => {
    var skillDao=new skillDAO(db);
    var user=req.user;
    var skillId=req.params.skillId
    skillDao.get(user,skillId,(err,skill)=>{
         if(err)return res.status(401).json({'Error':err.message});
         else return res.status(200).json(skill);
    })
})

//Create skill
router.post('/add',[ check('name').exists().notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    var skillDao=new skillDAO(db);
    var skill=req.body;
    var user=req.user;
    skillDao.create(user,skill,(err,createdSkill)=>{
        if(err)return res.status(401).json({
            "Error":err.message
        });
        else return res.status(200).json(createdSkill);
    });
})

//Update skill
router.put('/update/:skillId', (req, res) => {
    const values = req.body;
    const condition = {where: {name: req.params.skillId}}
    const options = {multi: true}
    Skill.update(values, condition, options)
    .then(rowsUpdate => res.json(rowsUpdate))
})

//Delete skill
router.delete('/delete/:skillId', (req, res) => {
    var skillDao=new skillDAO(db);
    var user=req.user;
    var skillId=req.params.skillId
    skillDao.remove(user,skillId,(err,skill)=>{
         if(err)return res.status(401).json({'Error':err.message});
         else return res.status(200).json({"Message":"skill deleted successfully"});
    })
})

module.exports = router;