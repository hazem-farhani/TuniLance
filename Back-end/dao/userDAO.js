var bcrypt = require('bcrypt-nodejs');
const { Op } = require("sequelize");


//eluserDAO ya5ou comme param db object
var userDAO=module.exports=function(db){
    //njib el users mta3i mel db.Users bech ne5dem alihom
    this.Users=db.Users;
    this.db=db;
}

function hashPassword(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}




//nasna3 fonction list of all users w naadiha comme param callback function
userDAO.prototype.list=function(callback){
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh");
    this.Users.findAll(/*{
        include:[{
            model:this.db.Skills,
            as:'skills'
        }]
    }*/)
    .then(users => {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh");
        console.log(users);
        if(!users)return callback(Error("there are no users"));
        return callback(null,users);
    })
    .catch(err => callback(err));
}


userDAO.prototype.getUser=function(id,callback){
    this.Users.findOne({
        where: {
            id:id
        },
        include:[{
            model:this.db.Skills,
            as:'skills'
        },
        {
            model:this.db.Services,
            as:'services'
        }]
    })
    .then(user=>{
        if(!user)return callback(Error("there is no user with this id"));
        return callback(null,user);
    })
    .catch(err=>callback(err));

}


userDAO.prototype.create=function(newUser,callback){ 
    this.Users.findOne({
        where:{
            [Op.or]:[
                {username:newUser.username},
                {email:newUser.email}
            ]  
        }
    }).then(user=>{
        if(!user){
            newUser.password=hashPassword(newUser.password);
            newUser.id=0;
            this.Users.create(newUser)
                .then(createdUser=>{
                    var returnedUser={
                         id:createdUser.id,
                         username:createdUser.username,
                         email:createdUser.email,
                         firstName:createdUser.firstName,
                         lastName:createdUser.lastName,
                         country:createdUser.country,
                         phoneNumber:createdUser.phoneNumber,
                         dateOfBirth:createdUser.dateOfBirth,
                         photo:createdUser.photo 
                         
                      }
                      return callback( null,returnedUser); 
                })
                .catch(err=>callback(err))
        }
        else return callback(Error("email or username are used"));
    }).catch(err=>callback(err));
}


userDAO.prototype.update=function(user,callback){
     id=user.id;
     var newUser={
         username:user.username,
         email:user.email,
         firstName:user.firstName,
         lastName:user.lastName,
         country:user.country,
         phoneNumber:user.phoneNumber,
         dateOfBirth:user.dateOfBirth,
         photo:user.photo,
         description:user.description
     }
     this.Users.findOne({
         where:{id:id}
     })
     .then(dbUser=>{
         if(!dbUser) return callback(Error("user not found"));
         else{
            this.Users.update(newUser,{
                where:{id:id},
                returning: true
            })
            .then(updatedUser=>{
                 if(!updatedUser)return callback(Error("update fails"));
                 else {
                      this.Users.findOne({
                          where:{
                              id:id
                          }
                      })
                      .then(returneddUser=>{
                         return callback(null,returneddUser); 
                      })
                      .catch(err=>callback(err));
                    
                 }
            })
            .catch(err=>{
                callback(err);
            })
         }
     })
     .catch(err=>{
         callback(err);
     })
     
}


userDAO.prototype.remove = function (id, callback) {
	this.Users.destroy({
		where: {
			id
		}
	}).then(user => {
		if (user > 0) return callback(null, user)
		else return callback(Error('User is not deleted'))
	}).catch(err => callback(err))

};





