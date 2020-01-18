const  route=require('express').Router();
const bodyParser = require("body-parser");
const authController=require('../controllers/auth.controller')
const check=require('express-validator').check ;
const authGuard=require('./guards/auth.guard')


route.get('/singUp',authGuard.isNotAuth,authController.getSingUn);

route.get('/login',authGuard.isNotAuth,authController.login);
route.get('/logout',authGuard.isAuth,authController.logout);


route.post('/singUp',authGuard.isNotAuth,
    check('username').isLength({min:6}).withMessage('user name must be at less 5 chars'),
    check('phone').isLength({min:9}).withMessage('enter valid phone number '),
    check('phone').not().isEmpty(),
    check('email').not().isEmpty().withMessage('email is required ')
        .isEmail().withMessage('email is invalid  format '),
    check('password').isLength({min:6}).withMessage('password most be at less 6 chars'),
    check('conformPassword').custom((value,{req})=>{
        if(value===req.body.password)
            return true
        else
            throw ' passwords not equal ..'
    }),
    bodyParser.urlencoded({limit: "5000mb", extended: true}),
    authController.postSingUn
);


route.post('/login',authGuard.isNotAuth,
    bodyParser.urlencoded({limit: "5000mb", extended: true}),
    authController.postLogin
);



module.exports=route ;