const router = require('express').Router();
const { Comment } = require('../config/database');
const { validationRules, validate} = require('../middlewares/commentValidator');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(comments => res.json(comments));
})

//Get comment
router.get('/:commentId', (req, res) => {
    console.log(req.params.commentId);
    Comment.findByPk(req.params.commentId)
    .then(comment => res.json(comment));
})

//Create comment
router.post('/', validationRules('createComment'), validate, (req, res) => {
    console.log(req.body);
    Comment.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ err: 'Verify your request body'}));
})

//Update comment
router.put('/:commentId', validationRules('createComment'), validate, (req, res) => {
    const values = req.body;
    const condition = {where: {id: req.params.commentId}}
    const options = {multi: true}
    Comment.update(values, condition, options)
    .then(rowsUpdate => res.json(rowsUpdate))
})

//Delete comment
router.delete('/:commentId', (req, res) => {
    const condition = {where: {id: req.params.commentId}}
    Comment.destroy(condition)
    .then(rowsDelete => res.json(rowsDelete))
})

module.exports = router;