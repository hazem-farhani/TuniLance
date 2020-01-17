const router = require('express').Router();
const { Skill } = require('../config/database');
const {check, validationResult} = require('express-validator');

router.get('/', (req, res) => {
    Skill.findAll()
    .then(skills => res.json(skills));
})

//Get skill
router.get('/:skillId', (req, res) => {
    Skill.findByPk(req.params.skillId)
    .then(skill => res.json(skill));
})

//Create skill
router.post('/',[ check('name').exists().notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    Skill.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ err: 'Verify your request body'}));
})

//Update skill
router.put('/:skillId', (req, res) => {
    const values = req.body;
    const condition = {where: {name: req.params.skillId}}
    const options = {multi: true}
    Skill.update(values, condition, options)
    .then(rowsUpdate => res.json(rowsUpdate))
})

//Delete skill
router.delete('/:skillId', (req, res) => {
    const condition = {where: {name: req.params.skillId}}
    Skill.destroy(condition)
    .then(rowsDelete => res.json(rowsDelete))
})

module.exports = router;