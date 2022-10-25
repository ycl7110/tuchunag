const express = require('express')
const imgSchema = require('./../models/imgSchema');
const mkdir = require('./../tool/mkdir'); // 导入自动创建文件夹的方法
// 创建路由容器
const router = express.Router()
const multer = require('multer');
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
    filename: function (req, file, cb) {
        let filename = new Date().getTime() + '.png'
        cb(null, filename)
    }
})

//用户查询 自己的图片
router.post('/api/img/list', async (req, res) => {
    let userid = req.user.data._id
    let data = await imgSchema.find({
        userid: userid
    }, ' url_path userid')
    console.log(data)
    res.send({ msg: 'success', code: 1, data: { list: data } })
})

var upload = multer({ storage: storage })
router.post('/upload', upload.single('file'), (req, res) => {
    const { path } = req.file
    let paths = (req.headers.host + '/' + path).replace(/\\/g, '/')
    let proxy = new imgSchema({
        userid: req.user.data._id,
        url_path: paths
    })
    proxy.save();
    res.send({ msg: 'success', fileurl: paths })
})
// 导出
module.exports = router