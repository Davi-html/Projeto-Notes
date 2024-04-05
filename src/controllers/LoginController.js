const Login = require('../models/LoginModel')

exports.paginaRegister = (req, res, )=>{
    res.render(`register`)    
}

exports.paginaLogin = (req, res)=>{
    res.render('login')
}

exports.login = async function(req, res){
    try{    
        const login = new Login(req.body)
        await login.login()

        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function(){
                res.redirect('/login')
            })

            return
        }

        req.flash('success', 'Voçê entrou no sistema')
        req.session.user = login.user
        req.session.save(function(){
            res.redirect('/')
        })
    }catch(e){
        console.log(e)
        res.send(e)
    }
}

exports.register = async function(req, res){
    try{
        const login = new Login(req.body)
        await login.register()

        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function(){
                res.redirect('/register')
            })

            return
        }

        req.flash('success', 'Seu usuário foi cadastrado com sucesso')
        req.session.save(function(){
            res.redirect('/register')
        })

    }catch(e){
        console.log(e)
        res.send('404')
    }
}

exports.logout = (req, res)=>{
    req.session.destroy()
    res.redirect('/login')
}