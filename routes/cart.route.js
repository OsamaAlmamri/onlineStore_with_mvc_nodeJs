const  route=require('express').Router();
const cartController=require('../controllers/cart.controller')
const bodyParser = require("body-parser");
const authGuard=require('./guards/auth.guard')
const check=require('express-validator').check ;


route.get('/',authGuard.isAuth,cartController.getCart);

route.post('/add',authGuard.isAuth,
    check('amount').not().isEmpty().isInt({min:1}).withMessage('amount must be at least 1'),
    // check('color').not().isEmpty().withMessage('amount must be selected'),
    bodyParser.urlencoded({limit: "5000mb", extended: true}),
    cartController.addToCart
);


module.exports=route ;