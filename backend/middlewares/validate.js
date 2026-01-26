// middleware/validate.js
const { body, validationResult } = require('express-validator');

const validateBranch = [
  body('name').trim().notEmpty().withMessage('Branch name required'),
  body('branchId').trim().notEmpty().withMessage('Branch ID required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      });
    }
    next();
  }
];

module.exports = validateBranch;  // EXPORT ARRAY DIRECTLY (not object)
