const cartModel = require('../models/cart.model');
const validationResult =require('express-validator').validationResult ;

exports.addToCart = (req, res) => {

    if(validationResult(req).isEmpty())
    {
        cartModel.AddNewItem({
             name : req.body.name,
             price : req.body.price,
             amount : req.body.amount,
             image : req.body.image,
             color :(typeof(req.body.color)==='undefined')?'-':req.body.color,
             size :(typeof(req.body.size)==='undefined')?'-':req.body.size,
             product_id : req.body.product_id,
             user_id : req.session.userId,
             timestamp : Date.now()
        }).then(()=>{
            res.redirect(req.body.redirectTo)
        }).catch(err=>{
            console.log(err)
        })
    }
    else
    {
        req.flash('errors',validationResult(req).array())
        res.redirect('/product/'+req.body.product_id)
    }

}


exports.getCart = (req, res) => {
    cartModel.getItemsByUser(req.session.userId).then(items => {
        res.render('website/cart', {
            items: items,
            pageTittle:"cart",
            isUser:req.session.userId
        })
    })
}
