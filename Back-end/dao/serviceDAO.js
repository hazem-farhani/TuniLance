const serviceDAO = module.exports = function(database){
  this.Services = database.Services;
  this.Sequelize = database.Sequelize;
  this.sequelize = database.sequelize;
  this.db=database;
}

serviceDAO.prototype.getService = function(id, next, error) {
  this.Services.findByPk(id,{
    include:[{
       model:this.db.Comments,
       as:'comments'
    }]
  })
  .then(service => service? next(service): error(Error(`There is no service with ${id}`)))
  .catch(err => error(err))
}

serviceDAO.prototype.getServicesByTitle = function(title, next, error) {
  const Op = this.Sequelize.Op;
  this.Services.findAll({
         where : {title: {[Op.like]:`%${title}%`} },
         include:[{
          model:this.db.Comments,
          as:'comments'
      }]
     })
  .then(services => next(services))
  .catch(err => error(err))
}

serviceDAO.prototype.getTopServices = function(limit, next, error) {
  this.Services.findAll({
    order: [[this.sequelize.col('rating'), 'DESC']],
    limit:3,
    include:[{
      model:this.db.Comments,
      as:'comments'
     }]
  })
  .then(services => services? next(services): error(Error(`There isn't enough services`)))
  .catch(err => error(err))
}

serviceDAO.prototype.createService = function(service, next, error) {
  this.Services.create(service)
  .then(service => next(service))
  .catch(err => error(err))
}

serviceDAO.prototype.updateService = function(payload, next, error) {
  const { values, condition, options } = payload;
  this.Services.update(values, condition, options)
  .then(rowsUpdated => (rowsUpdated[0])? next("Updated"):error(Error(`There is no service with id ${condition.where.id}`)))
  .catch(err => error(err))
}

serviceDAO.prototype.deleteService = function(condition, next, error) {
  this.Services.destroy(condition)
  .then(rowsDeleted => (rowsDeleted)? next("Deleted"):error(Error(`There is no service with id ${condition.where.id}`)))
  //Error(`There is no service with id ${condition.where.id}`)
  .catch(err => error(err))
}
