const authModel = require('../models/auth.model');
const validationResult =require('express-validator').validationResult ;


exports.getSingUn = (req, res) => {
    res.render('website/singup', {
        pageTittle: "login",
        errors:req.flash('errors')
    })
}

exports.postSingUn = (req, res) => {
    if(validationResult(req).isEmpty())
    {
        authModel.createNewUser(req.body.username, req.body.email, req.body.password, req.body.phone)
            .then(() =>
                res.redirect('/login')
            ).catch( err=> {
            console.log(err);
            res.redirect('/singUp')

        })

    }
    else
    {
        req.flash('errors',validationResult(req).array())
        res.redirect('/singUP')
    }

}

exports.postLogin = (req, res) => {
    console.log(req.body)
    authModel.login( req.body.email, req.body.password)
        .then(id =>{
            req.session.userId=id
            res.redirect('/')
        }).catch( err=> {
        console.log(err);
        req.flash('errorLogin',err) ;
        res.redirect('/login')

    })
}

exports.login = (req, res) => {
    res.render('website/login', {
        errors:req.flash('errorLogin'),
        pageTittle: "login"
    })
}


exports.logout = (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/login');
    });


}
