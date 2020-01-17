//eluserDAO ya5ou comme param db object
var userDAO=module.exports=function(db){
    //njib el users mta3i mel db.Users bech ne5dem alihom
    this.Users=db.Users;
}





//nasna3 fonction list of all users w naadiha comme param callback function
userDAO.prototype.list=function(callback){
    this.Users.findAll()
    .then(users => {
        if(!users)return callback(Error("there are no users"));
        return callback(null,users);
    })
    .catch(err => callback(err));
}


userDAO.prototype.getUser=function(id,callback){
    this.Users.findAll({
        where: {
            id:id
        }
    })
    .then(user=>{
        if(!user)return callback(Error("there is no user with this id"));
        return callback(null,user);
    })
    .catch(err=>callback(err));
}

userDAO.prototype.register=function(user,callback){
    

}