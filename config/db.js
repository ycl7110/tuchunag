/**
 * 数据库连接
 */
const mongoose = require('mongoose')
const URL = 'mongodb://127.0.0.1:27017/bed'
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', () => {
    console.log('***数据库连接失败***')
})

db.on('open', () => {
    console.log('***数据库连接成功***')
})