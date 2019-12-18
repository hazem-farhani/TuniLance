const router = require('express').Router();
const { Service } = require('../config/database');
const {validationRules, validate} = require('../middlewares/serviceValidator');

router.get('/', (req, res) => {
    Service.findAll()
    .then(services => res.json(services));
})

//Get service
router.get('/:serviceId', (req, res) => {
    console.log(req.params.serviceId);
    Service.findByPk(req.params.serviceId)
    .then(service => res.json(service));
})

//Create service
router.post('/',validationRules('createService'), validate, (req, res) => {
    console.log(req.body);
    Service.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ err: 'Verify your request body'}));
})

//Update service
router.put('/:serviceId',validationRules('updateService'), validate, (req, res) => {
    const values = req.body;
    const condition = {where: {id: req.params.serviceId}}
    const options = {multi: true}
    Service.update(values, condition, options)
    .then(rowsUpdate => res.json(rowsUpdate))
})

//Delete service
router.delete('/:serviceId', (req, res) => {
    const values = req.body;
    const condition = {where: {id: req.params.serviceId}}
    Service.destroy(condition)
    .then(rowsDelete => res.json(rowsDelete))
})

module.exports = router;