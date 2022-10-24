const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
// 引入router模块
const router = require('./route')
const user = require('./route/user')
const file = require('./route/file')
//使用中间件
// swagger
// 使用swagger API 文档
var swaggerInstall = require('./TOOL/swagger')
swaggerInstall(app)

require('./config/db')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(router)
app.use(user)
app.use(file)
app.listen(port, () => console.log(`项目已经启动`))
