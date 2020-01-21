const router = require('express').Router();
const path = require('path');
const {validationRules, validate} = require('../middlewares/serviceValidator');
const serviceDAO = require('../dao/serviceDAO');
const database = require('../config/database');
const multer  = require('multer');

//Configure Multer
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/service')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

var upload = multer({ storage: storage }).single('file');


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

//Get service photo by id
router.get('/photo/:serviceId', (req, res) => {
    const serviceDao = new serviceDAO(database);
    res.header("Access-Control-Allow-Origin", "*");
    serviceDao.getService(req.params.serviceId,
      service => {
        //res.download()

        res.sendFile(path.join(__dirname,"..\\"+service.photo));
      },
      err => {
        console.log(err.message)
        res.status(404).json({error: err.message})
      }
    )
    //Service.findByPk(req.params.serviceId)
    //.then(service => res.json(service));
})

//Get one service by id
router.get('/:serviceId', (req, res) => {
    const serviceDao = new serviceDAO(database);
    res.header("Access-Control-Allow-Origin", "*");
    serviceDao.getService(req.params.serviceId,
      service => {
        //res.download()

        //res.sendFile(path.join(__dirname,"..\\"+service.photo));
        res.json(service)
      },
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
router.post('/', upload, validationRules('createService'), validate, (req, res) => {
    const serviceDao = new serviceDAO(database);
    serviceDao.createService(req.file, req.body,
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
