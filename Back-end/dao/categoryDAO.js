const { Op } = require("sequelize");

var categoryDAO=module.exports=function(db){
    //njib el users mta3i mel db.Users bech ne5dem alihom
    this.Categories=db.Categories;
    this.db=db;
}


categoryDAO.prototype.create=function(category,callback){
    this.Categories.create(category)
       .then(newCategory=>{
            if(newCategory)return callback(null,newCategory);
            else return callback(Error("sorry,category not created"));
       })
       .catch(err=>callback(err));
}

categoryDAO.prototype.list=function(callback){
    this.Categories.findAll()
    .then(categories=>{
          if(categories)return callback(null,categories);
          else return callback(Error("there are no categories"));
    })
    .catch(err=>callback(err));
}

categoryDAO.prototype.get=function(categoryId,callback){
    this.Categories.findOne({
        where:{
            id:categoryId
        },
        include:[{
            model:this.db.Services,
            as:'services'
        }]
    })
    .then(category=>{
          if(category)return callback(null,category);
          else return callback(Error("no such category exists"));
    })
    .catch(err=>callback(err));
}