exports.middlewareGlobal = (req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.errors = req.flash('errors')
    res.locals.user = req.session.user
    next()
}

exports.checkCsfrError = (error, req, res, nex) => {
    if(error && error.code === 'EBADCSRFTOKEN'){
        return res.render('404')
    }
}

exports.CsrfMiddleware = (req, res, next)=>{
    res.locals.csrfToken = req.csrfToken()
    next()
}