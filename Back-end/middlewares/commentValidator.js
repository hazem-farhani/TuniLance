const { body, validationResult } = require('express-validator');

const validationRules = (method) => {
    switch (method) {
        case 'createComment': return [
            body('content').exists().notEmpty(),
            body('rating').optional().isInt({get:0, lt:6}),    // 1<= and <=5
        ];
    }
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        return next();
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))
    return res.status(422).json({
        errors : extractedErrors
    })
}

module.exports = {
    validationRules,
    validate
}