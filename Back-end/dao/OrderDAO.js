const { Op } = require("sequelize");

var orderDAO=module.exports=function(db){
    //njib el users mta3i mel db.Users bech ne5dem alihom
    this.Orders=db.Orders;
}


orderDAO.prototype.create=function(user,skill,callback){
    if(user.id!=order.userId)return callback(Error("you have no right to create order for another user"));
    this.Orders.create(order)
       .then(newOrder=>{
            if(newOrder)return callback(null,newOrder);
            else return callback(Error("sorry,order not created"));
       })
       .catch(err=>callback(err));
}

orderDAO.prototype.list=function(freelancer,callback){
    var freelancerId=freelancer.id;
    this.Orders.findAll({
        where:{
            freelancerId:freelancerId//orders recieved by freelancer
        }
    })
    .then(orders=>{
          if(orders)return callback(null,orders);
          else return callback(Error("you have no orders yet"));
    })
    .catch(err=>callback(err));
}

orderDAO.prototype.get=function(freelancer,orderId,callback){
    var freelancerId=freelancer.id;
    this.Orders.findOne({
        where:{
            [Op.and]:[
                {id:orderId},
                {freelancerId:freelancerId}
            ] 
        }
    })
    .then(order=>{
          if(order)return callback(null,order);
          else return callback(Error("no such error exists"));
    })
    .catch(err=>callback(err));
}

//user who created this order is the only who can delete it
orderDAO.prototype.remove=function(user,orderId,callback){
    var userId=user.id;
    this.Orders.destroy({
        where:{
            [Op.and]:[
                {id:orderId},
                {userId:userId}
            ] 
        }
    })
    .then(ok=>{
          if(ok)return callback(null,ok);
          else return callback(Error("you are  not allowed to delete this skill or such skill doesn't exist"));
    })
    .catch(err=>callback(err));
}