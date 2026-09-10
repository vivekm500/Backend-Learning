import {body, validationResult} from 'express-validator'

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};

export const registerValidator = [
    body('username').isString().withMessage("username is not valid"),
    body('email').isEmail().withMessage("email is not valid"),
    body('password').custom((value)=>{
        if(value.length < 6 || value.length > 12){
            throw new Error("password must be between 6 to 12 characters")
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
        if(!regex.test(value)){
            throw new Error("password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }
    }).withMessage("passwor should be string and must be between 6 to 12 characters and must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    body('userid').isMongoId().withMessage("userid is not valid"),
    validate
]