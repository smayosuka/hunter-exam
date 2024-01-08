require('dotenv').config()

// koa
const koa = require('koa')
const {koaBody} = require('koa-body')
const static = require('koa-static')
const session = require('koa-session')
const normalizePath = require('koa-normalize-path')

// utilities
const passport = require('koa-passport')
const path = require('path')

// database
const mongoose = require('mongoose')

// mongoose
mongoose.connect('mongodb://localhost:27017/database')

const app = new koa({keys: ['huuu'], subdomainOffset: 1})
app.use(koaBody({multipart: true, uploadDir: '.'}))
app.use(normalizePath())
app.use(passport.initialize())
app.use(passport.session())

// session
const sessConfig = {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false, /** (boolean) secure cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
} 
app.use(session(sessConfig, app))

// static
app.use(static(path.join(__dirname, '/static')))

// routes
app.use(require('./routes/main').routes())

// listen
app.listen(3000, function() {
    console.log(`Server live`)
})