const router = require('koa-router')
const {Eta} = require('eta')
const path = require('path')
const db = require('../db')

const r = router()
const eta = new Eta({views: path.join(__dirname, '../views')})

r.get('/', async function(ctx, next) {
    // ctx.body = await eta.renderAsync('index.html', {username: ctx.session.username, admin: ctx.session.admin})
    ctx.body = await eta.renderAsync('index.html')
})

r.get('/user', async function(ctx, next) {
    if (ctx.session.username) {
        if (!ctx.session.visits) {
            ctx.session.visits = {}
        }

        ctx.session.visits[new Date()] = ctx.request.header
        ctx.body = await eta.renderAsync('user.html', {username: ctx.session.username, userAgent: ctx.session.userAgent, visits: ctx.session.visits})
    } else {
        ctx.body = 'anda belum login.'
    }
})

r.get('/login', async function(ctx, next) {
    ctx.body = await eta.renderAsync('login.html')
})

r.get('/logout', async function(ctx, next) {
    ctx.session = null
    ctx.redirect('/')
})

r.post('/login', async function(ctx, next) {
    if (ctx.request.body.username && ctx.request.body.password) {
        await db.user.findOne({username: ctx.request.body.username}).then(function(result) {
            if (result) {
                if (result.password == ctx.request.body.password) {
                    ctx.session = {
                        id: ctx._id,
                        username: result.username
                    }

                    ctx.redirect('/user')
                } else {
                    ctx.body = 'password salah'
                }
            } else {
                ctx.body = 'username salah'
            } 
        })
    } else {
        ctx.body = 'data tidak lengkap'
    }
})

module.exports = r