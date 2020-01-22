const { Op } = require("sequelize");

var commentDAO=module.exports=function(db){
    //njib el users mta3i mel db.Users bech ne5dem alihom
    this.Comments=db.Comments;
}


commentDAO.prototype.create=function(user,comment,callback){
	console.log(user);
	console.log(user);
    if(user.id!=comment.userId)return callback(Error("you have no right to create comment for another user"));
    this.Comments.create(comment)
       .then(newComment=>{
            if(newComment)return callback(null,newComment);
            else return callback(Error("sorry,comment not created"));
       })
       .catch(err=>callback(err));
}

commentDAO.prototype.update=function(user,comment,callback){
    if(user.id!=comment.userId)return callback(Error("you have no right to update comment for another user"));
    this.Comments.findByPk(comment.id)
       .then(dbComment=>{
            if(dbComment){
                dbComment.update(comment)
                   .then(updatedComment=>{
                       if(!updatedComment)return callback({"Error":"update failed"});
                       else return callback(null,updatedComment);
                   })
                   .catch(err=>callback(err));
            }
            else return callback(Error("sorry,such comment doesn't exist"));
       })
       .catch(err=>callback(err));
}

commentDAO.prototype.list=function(user,callback){
    var userId=user.id;
    this.Comments.findAll({
        where:{
            userId:userId
        }
    })
    .then(Comments=>{
          if(Comments)return callback(null,Comments);
          else return callback(Error("you have no comments yet"));
    })
    .catch(err=>callback(err));
}

commentDAO.prototype.get=function(user,commentId,callback){
    var userId=user.id;
    this.Comments.findOne({
        where:{
            [Op.and]:[
                {id:commentId},
                {userId:userId}
            ] 
        }
    })
    .then(Comment=>{
          if(Comment)return callback(null,Comments);
          else return callback(Error("no such comment exists"));
    })
    .catch(err=>callback(err));
}

commentDAO.prototype.remove=function(user,commentId,callback){
    var userId=user.id;
    this.Comments.destroy({
        where:{
            [Op.and]:[
                {id:commentId},
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