const router = require('express').Router();
const {validationRules, validate} = require('../middlewares/serviceValidator');
const serviceDAO = require('../dao/serviceDAO');
const database = require('../config/database');

//CENTRALIZE SERVICEDAO INSTANCE
//IMPLEMENT LOGGER
//Get all services
router.get('/list', (req, res) => {
    database.Services.findAll()
    .then(services => res.json(services));
})

router.get('/top3', (req, res) => {
    const serviceDao = new serviceDAO(database);
    res.header("Access-Control-Allow-Origin", "*");
    serviceDao.getTopServices(3,
      service => res.json(service),
      err => {
        console.log(err.message)
        res.status(404).json({error: err.message})
      }
    )
})
//Get one service by id
router.get('/:serviceId', (req, res) => {
    const serviceDao = new serviceDAO(database);
    res.header("Access-Control-Allow-Origin", "*");
    serviceDao.getService(req.params.serviceId,
      service => res.json(service),
      err => {
        console.log(err.message)
        res.status(404).json({error: err.message})
      }
    )
    //Service.findByPk(req.params.serviceId)
    //.then(service => res.json(service));
})

//Get all services that include that title
router.get('/title/:serviceTitle', (req, res) => {
    const serviceDao = new serviceDAO(database);
    serviceDao.getServicesByTitle(req.params.serviceTitle,
      service => res.json(service),
      err => {
        console.log(err.message)
        res.status(404).json({error: err.message})
      }
    )
    //Service.findByPk(req.params.serviceId)
    //.then(service => res.json(service));
})

//Create service
router.post('/',validationRules('createService'), validate, (req, res) => {
    const serviceDao = new serviceDAO(database);
    serviceDao.createService(req.body,
      service => res.json(service),
      err => res.status(400).json({error : err.message})
    )
    /*Service.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ err: 'Verify your request body'}));*/
})

//Update service
router.put('/:serviceId',validationRules('updateService'), validate, (req, res) => {
    const serviceDao = new serviceDAO(database);
    const values = req.body;
    const condition = {where: {id: req.params.serviceId}}
    const options = {multi: true}
    serviceDao.updateService({values, condition, options},
      updatedService => res.json(updatedService),
      err => res.status(400).json({error : err.message})
    )
})

//Delete service
router.delete('/:serviceId', (req, res) => {
    const serviceDao = new serviceDAO(database);
    const condition = {where: {id: req.params.serviceId}}
    serviceDao.deleteService(condition,
      message => res.json(message),
      err => res.status(400).json({error : err.message})
    )
    /*Service.destroy(condition)
    .then(rowsDelete => res.json(rowsDelete))*/
})

module.exports = router;
