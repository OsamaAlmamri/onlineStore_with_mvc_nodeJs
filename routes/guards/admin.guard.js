exports.isAdmin = (req, res, next) => {
    if (req.session.isAdmin ===1)
        next()
    else
        res.redirect('/admin/login')
}


