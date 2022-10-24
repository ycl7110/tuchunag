const express = require('express')
const mkdir = require('./../tool/mkdir'); // 导入自动创建文件夹的方法
// 创建路由容器
const router = express.Router()
const multer = require('multer');
const { route } = require('./user');

//新建文件夹
router.post('/addFile', (req, res) => {
    let filename = req.body.fileName
    if (filename) {
        mkdir.mkdirs('../static/img/' + filename,
         err => {
            res.send({ msg: '成功' })
        });
    } else {
        res.send({ msg: 'error' })
    }
})
//文件同
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 这里是在server端要放图片的目录
        cb(null, './static/img')
    },
    // 这里是对文件重命名
    filename: function (req, file, cb) {
        let filename = new Date().getTime() + '.png'
        cb(null, filename)
    }
})
var upload = multer({ storage: storage })
//single中的字段要和前端上传的formData的字段一致
router.post('/upload', upload.single('file'), (req, res) => {
    const { path } = req.file
    let paths = (req.headers.host + '/' + path).replace(/\\/g, '/')
    res.send({ msg: 'success', fileurl: paths })
    //返回在server端存放的路径
})
// 导出
module.exports = router