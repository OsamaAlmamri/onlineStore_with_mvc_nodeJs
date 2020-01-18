const  route=require('express').Router();
const productController=require('../controllers/product.controller')


route.get('/',productController.getFirstProduct);
route.get('/:id',productController.getProduct);

module.exports=route ;