const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    // "userId" : Number,//用户ID，自增长
    "userName" : String,//用户名称
    "userPwd" : String,//用户密码，md5加密
    "createTime" : {
        type:Date,
        default:Date.now()
    },//创建时间
    "lastLoginTime" : {
        type:Date,
        default:Date.now()
    },//更新时间
    // remark:String
})

module.exports = mongoose.model("users",userSchema,"users")