const router = require('express').Router();
const { Comment } = require('../config/database');
const { validationRules, validate} = require('../middlewares/commentValidator');
const commentDAO=require('../dao/commentDAO');
const db=require('../config/database');


//list of comments
router.get('/list', (req, res) => {
    var user=req.user;
    var commentDao=new commentDAO(db);
    commentDao.list(user,(err,comments)=>{
        if(err)return res.status(404).json({
            "Error":err.message
        });
        else return res.status(200).json(comments);
    })
})

//Get comment
router.get('/:commentId', (req, res) => {
    var user=req.user;
    var commentDao=new commentDAO(db);
    commentDao.get(user,commentId,(err,comment)=>{
        if(err)return res.status(404).json({
            "Error":err.message
        });
        else return res.status(200).json(comment);
    })
});

//Create comment
router.post('/add', validationRules('createComment'), validate, (req, res) => {
    var commentDao=new commentDAO(db);
    var comment=req.body;
    var user=req.user;
    commentDao.create(user,comment,(err,createdComment)=>{
        if(err)return res.status(401).json({
            "Error":err.message
        });
        else return res.status(200).json(createdComment);
    });
})

//Update comment
router.put('/update/:commentId', validationRules('createComment'), validate, (req, res) => {
    var newComment = req.body;
    var commentDao=new commentDAO(db);
    var user=req.user;
    var commentId=req.params.commentId;
    if(commentId!=newComment.id)return res.status(400).json({"Error":"you cannot update this comment"})
    commentDao.update(user,comment,(err,updatedComment)=>{
        if(err)return res.status(400).json({
            "Error":err.message
        });
        else return res.status(200).json(updatedComment);
    });
})

//Delete comment
router.delete('/delete/:commentId', (req, res) => {
    var commentDao=new commentDAO(db);
    var user=req.user;
    var commentId=req.params.commentId;
    commentDao.remove(user,commentId,(err,coment)=>{
         if(err)return res.status(401).json({'Error':err.message});
         else return res.status(200).json({"Message":"comment deleted successfully"});
    })
})

module.exports = router;