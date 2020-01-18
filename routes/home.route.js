const  route=require('express').Router();
const homeController=require('../controllers/home.controller')
const authGuard=require('./guards/auth.guard')


route.get('/',homeController.getHome);
route.get('/categories',homeController.getCategories);
route.get('/product',homeController.getProduct);

route.get('/checkout',authGuard.isAuth,homeController.getCheckout);

module.exports=route ;