const { body, validationResult } = require('express-validator');

const validationRules = (method) => {
    switch (method) {
        case 'createService': {
            return [
                body('description', 'provide a description').exists(),
                body('timerequired').exists().isInt(),
                body('price').exists().isInt()
            ]
        };
        case 'updateService': {
            return [
                body('timerequired').isInt(),
                body('price').isInt()
            ]
        }
    }
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = {
    validationRules,
    validate
}