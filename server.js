require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(()=> {
        app.emit('pronto')
    })
    .catch(e => console.error(e))
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const routes = require('./routes') 
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const { middlewareGlobal, checkCsfrError, CsrfMiddleware } = require('./src/middlewares/middleware')

const PORT = 3000

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))


const sessionOptions = session({
    secret: 'ppoiqyenmdvmlhsdeiowjf',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csrf())
app.use(middlewareGlobal)
app.use(checkCsfrError)
app.use(CsrfMiddleware)
app.use(routes)

app.on('pronto', ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server executando na porta ${PORT}`)
        console.log(`Acessar http://localhost:${PORT}`)
    })
})
