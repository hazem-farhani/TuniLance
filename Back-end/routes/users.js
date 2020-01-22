const router = require('express').Router();
//njbi eldb object mel database
const db = require('../config/database');
//njib el userDAO
const userDAO=require('../dao/userDAO');
var passport = require('passport')
const jwt = require('jsonwebtoken');
var auth=require('../middlewares/auth');
jwtConfig=require('../config/jwt');





//get list of all users
router.get('/list',auth,(req, res) =>{
    //nasna3 userDao w naadilou el db object
    var userDao=new userDAO(db);
    //ne5tar elfonction elli nheb aliha mel userDao
    userDao.list((err,users)=>{
        if(err)return res.status(404).json({
            "Error":err.message
        });
        else{
            return res.status(200).json(users);
        }
    })
});

 //get current user
 router.get('/me',auth,(req,res)=>{
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(req.user);
    var userDao=new userDAO(db);
    var id=req.user.id;
    userDao.getUser(id,(err,user)=>{
        if(err)return res.status(404).json({
             "Error":err.message
        })
        else{
            return res.status(200).json(user);
        }
    })
 });


 //get user with id
router.get('/:id',auth,(req,res)=>{
    var id=req.params.id;
    var userDao=new userDAO(db);
    userDao.getUser(id,(err,user)=>{
        if(err)return res.status(404).json({
             "Error":err.message
        })
        else{
            return res.status(200).json(user);
        }
    })
 });


 //register
 router.post('/register',(req,res)=>{
    //check if there is a non needed property
	var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["username", "password","email"]
	/*propertiesNames.forEach(name => {
		if (neededProperties.indexOf(name) < 0 || propertiesNames.length < neededProperties.length) {
			return res.status(400).json({
				"Error": "Uneeded Input Data"
			});
		}
	});*/
	if (propertiesNames.length < neededProperties.length)
		res.status(400).json({
			"Error": "Missing Input Data"
		});
     var newUser = req.body;
     var userDao=new userDAO(db);
     userDao.create(newUser,(err,createdUser)=>{
          if(err) {
              console.log(err)
              return res.status(500).json({
              "Error":err.message
          })
        }
          else{
            const token=jwt.sign({
                id:createdUser.id,
                username:createdUser.username
               },jwtConfig.key);
              return res.status(200).json({
                token:token,
                message:"Welcome you are logged In"
            });
          }
     })
 })


 router.post('/login',(req,res,next)=>{
     var userDao=new userDAO(db);
     passport.authenticate('login',{session:false},(err,user,info)=>{
         if(err)return next(err);
         if(info!=undefined)return res.status(400).json({
             "Error":info.message
         })
         else{
             req.logIn(user,err=>{
                 if(err)console.log(err);
                 else{
                     userDao.Users.findOne({
                         where:{
                             username:user.username
                         }
                     }).then(user=>{
                         const token=jwt.sign({
                             id:user.id,
                             username:user.username
                         },"secret-key");
                         res.status(200).send({
                             token:token,
                             message:"Welcome you are logged In"
                         })
                     })
                 }
             })

         }
     })(req,res,next)
 });



//update user
 router.put('/update/:id',auth,(req,res)=>{
     var id=req.params.id;
     user=req.body;
     if(user.id!=id)return res.status(400).json({
         Error:"wrong data passed "
     })
     var userDao=new userDAO(db);
     userDao.update(user,(err,user)=>{
           if(err)return res.status(400).json({
               Error:err.message
           });
           else{
               return res.status(200).json({
                   user
               })
           }
     })
 });

 router.delete('/delete/:id',auth,(req,res)=>{
    var id=req.params.id;
    var userDao=new userDAO(db);
    userDao.remove(id,(err,user)=>{
        if(err)return res.status(400).json({
            Error:err.message
        });
        else return res.status(200).json({
            Message:"User deleted successfully"
        })
    })

 })




module.exports = router;
