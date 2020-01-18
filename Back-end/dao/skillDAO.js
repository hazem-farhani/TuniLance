const { Op } = require("sequelize");

var skillDAO=module.exports=function(db){
    //njib el users mta3i mel db.Users bech ne5dem alihom
    this.Skills=db.Skills;
}


skillDAO.prototype.create=function(user,skill,callback){
    if(user.id!=skill.userId)return callback(Error("you have no right skill for another user"));
    this.Skills.create(skill)
       .then(newSkill=>{
            if(newSkill)return callback(null,newSkill);
            else return callback(Error("sorry,skill not created"));
       })
       .catch(err=>callback(err));
}

skillDAO.prototype.list=function(user,callback){
    var userId=user.id;
    this.Skills.findAll({
        where:{
            userId:userId
        }
    })
    .then(skills=>{
          if(skills)return callback(null,skills);
          else return callback(Error("you have no skills yet"));
    })
    .catch(err=>callback(err));
}

skillDAO.prototype.get=function(user,skillId,callback){
    var userId=user.id;
    this.Skills.findOne({
        where:{
            [Op.and]:[
                {id:skillId},
                {userId:userId}
            ] 
        }
    })
    .then(skill=>{
          if(skill)return callback(null,skill);
          else return callback(Error("no such skill exists"));
    })
    .catch(err=>callback(err));
}

skillDAO.prototype.remove=function(user,skillId,callback){
    var userId=user.id;
    this.Skills.destroy({
        where:{
            [Op.and]:[
                {id:skillId},
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