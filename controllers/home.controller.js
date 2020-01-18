const productModel = require('../models/products.model');


exports.getHome = (req, res) => {
    productModel.getAllProducts().then(products => {
        res.render('website/index', {
            products: products,
            pageTittle:"home",
            isUser:req.session.userId
        })
    })
}


exports.getCategories = (req, res) => {

    let category=req.query.category;
    let vaildCategories=['man','woman','child','all']
    console.log('category');
    console.log(category);
    let productPromise;

    if(category &&  vaildCategories.includes(category))
        productPromise=productModel.getProductsByCategory(category);
    else
        productPromise=productModel.getAllProducts()

    productPromise.then(products => {
        res.render('website/categories', {
            products: products,
            pageTittle:"categories",
            isUser:req.session.userId
        })
    })
}
exports.getProduct = (req, res) => {
    productModel.getAllProducts().then(products => {
        res.render('website/product', {
            products: products,
            pageTittle:"product",
            isUser:req.session.userId
        })
    })
}

exports.getCheckout = (req, res) => {
    productModel.getAllProducts().then(products => {
        res.render('website/Checkout', {
            products: products,
            pageTittle:"Checkout",
            isUser:req.session.userId
        })
    })
}