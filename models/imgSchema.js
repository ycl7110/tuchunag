const mongoose = require('mongoose')
const imgSchema = mongoose.Schema({
    "url_path": '',
    'userid': [mongoose.Types.ObjectId],
    "createTime": {
        type: Date,
        default: Date.now()
    },//创建时间
    "lastLoginTime": {
        type: Date,
        default: Date.now()
    },//更新时间
})

module.exports = mongoose.model("img", imgSchema, "imgs")