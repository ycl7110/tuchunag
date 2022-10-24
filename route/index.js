const express = require('express')
const path = require('path')
const expressJwt = require('express-jwt')
// 创建路由容器
const router = express.Router()

//设置跨域
router.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    next();
})

//token中间件
let secretOrPrivateKey = 'ycl'
router.use(expressJwt({
    secret: secretOrPrivateKey,
    algorithms: ['HS256']
}).unless({
    path: ['/login', '/register', '/', '/test', '/static','/swagger'] // 指定路径不经过 Token 解析
}))

router.use(function (err, req, res, next) {
    //Authorization  验证的token字段
    // next()  跳过验证
    if (err.name === 'UnauthorizedError') {
        //解析失败，返回错误信息
        res.json({ 'code': 401, 'msg': '无权限访问' })
    }
})
router.get('/', (req, res) => {
    res.send('预留设置')
})
//测试网站启动
router.get('/test', (req, res) => { res.send('网站启动成功') })

//使用express中间件来实现静态资源服务
router.use('/static', express.static(path.join(__dirname, './../static/img')))


// 导出
module.exports = router