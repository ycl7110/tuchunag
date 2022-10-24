const express = require('express')
const User = require('./../models/userSchema');
const jwt = require('jsonwebtoken')
// 创建路由容器
const router = express.Router()
/**,
 * @swagger
 * /register: #一定要写完整路径 我使用路由中间件的时候 加了api前缀
 *    post:
 *      tags: #用户
 *      - 注册
 *      summary: 用户注册
 *      produces:
 *      - application/json #返回类型
 *      parameters: #参数以及参数类型
 *      - userName: userName
 *        in: query
 *        description: 用户姓名
 *        required: true
 *        type: string
 *      - userPwd: userPwd
 *        in: query
 *        description: 密码
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: successful operation   
 *        401:
 *          description: Order not found                  
 * */

router.post('/register', async (req, res) => {
    const { userName, userPwd } = req.body
    if (userName && userPwd) {
        let isExist = await User.findOne({
            $or: [{
                userName
            }, {
                userPwd
            }]
        }, '_id userName userPwd')
        console.log(isExist)
        if (isExist) {
            let proxyUser = new User({
                userName,
                userPwd,
            })
            proxyUser.save();
            res.send({ msg: '注册成功' })
        } else {
            res.send({code:401, msg: '检测到已注册用户' })
        }
    } else {
        res.send({ msg: '请输入完整数据' })
    }

})
//用户登录
router.post('/login', async (req, res) => {
    const { userName, userPwd } = req.body
    let data = await User.findOne({
        userName,
        userPwd,
    }, 'userName userPwd')
    if (data) {
        let token = jwt.sign({
            data
        }, 'ycl', {
            expiresIn: '1d'
        })
        let proxy = {
            userName,
            userPwd,
            token,
        }
        res.send({ msg: '登录成功', data: proxy })
    } else {
        res.send({ msg: "登陆失败" })
    }
})

/**,
 * @swagger
 * /api/hello: #一定要写完整路径 我使用路由中间件的时候 加了api前缀
 *    get:
 *      tags: #分类
 *      - 测试
 *      summary: 提交考试答案 #这个接口的提示
 *      produces:
 *      - application/json #返回类型
 *      parameters: #参数以及参数类型
 *      - name: name
 *        in: query
 *        description: 姓名
 *        required: false
 *        type: integer
 *      responses:
 *        200:
 *          description: successful operation 
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found               
 * */

router.get("/hello", (req, res) => {
    const name = req.query.name;
    res.send({
        hello: `hello`
    });
});

router.post('/user/test', async (req, res) => {
    console.log(req.user)
    res.send({ msg: "user/test/shibai1" })
})
module.exports = router