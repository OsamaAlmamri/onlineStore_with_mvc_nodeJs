const productModel = require('../models/products.model');


exports.getProduct = (req, res) => {
    let id=req.params.id

    productModel.getProductById(id).then(product => {

        res.render('website/product', {
            product: product,
            pageTittle:"product",
            isUser:req.session.userId
        })

    })
}

exports.getFirstProduct = (req, res) => {


    productModel.getFirstProduct().then(product => {

        res.render('website/product', {
            product: product,
            pageTittle:"product",
            isUser:req.session.userId
        })

    })
}
