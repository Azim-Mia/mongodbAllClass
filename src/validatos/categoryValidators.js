const {body} =require('express-validator');
const categoryValidationName=[
 body('name')
  .trim()
  .notEmpty()
  .withMessage('Name is require.Enter your name')
  .isLength({min: 3, max:31})
  .withMessage('min Length 3'),
  ];
  module.exports=categoryValidationName;
  