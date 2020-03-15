// server
// import routes from './routers'
const routes = require('./routers')

const express = require('express')
const apicache = require('apicache')
const path = require('path')
const fs = require('fs')
let cache = apicache.middleware

const app = express()

// 跨域设置
app.all('*', function(req, res, next) {
  if (req.path !== '/' && !req.path.includes('.')) {
    res.header('Access-Control-Allow-Credentials', true)
    // 这里获取 origin 请求头 而不是用 *
    res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Content-Type', 'application/json;charset=utf-8')
  }
  next()
})
const onlyStatus200 = (req, res) => res.statusCode === 200

app.use(cache('2 minutes', onlyStatus200))

let dir = path.resolve(__dirname, 'public')

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(function(req, res, next) {
  const proxy = req.query.proxy
  if (proxy) {
    req.headers.cookie = req.headers.cookie + `__proxy__${proxy}`
  }
  next()
})

app.use('/', routes)
const port = 3001
app.listen(port, () => {
  console.log(`server running @ http://localhost:${port}`)
})
