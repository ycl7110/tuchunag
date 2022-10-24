var path = require("path");
var express = require("express");
var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");
//author:neversleep
//comment:swagger请求路径：http://localhost:9009/swagger
// 配置 swagger-jsdoc
const options = {
    definition: {
        // 采用的 openapi 版本。***注意该版本直接影响了管网参考版本。
        openapi: "3.0.0",
        // 页面基本信息
        info: {
            title: "茶叶商城", //设置swagger的标题。（项目名称）
            version: "1.0.0", //设置版本
        },
        //设置锁。用于生成swagger文档。(这部分是我抄的 还没明白有什么用0.0)
        // components: {
        //     securitySchemes: {
        //         oauth2: {
        //             type: "oauth2",
        //             flows: {
        //                 authorizationCode: {
        //                     authorizationUrl: "/oauth/dialog",
        //                     tokenUrl: "/oauth/token",
        //                 },
        //             },
        //         },
        //     },
        // },
    },
    // 去指定项目路径下收集 swagger 注释，用于生成swagger文档。
    //这里一定要写路由的地址 不能随便抄!
    apis: [path.join(__dirname, "./../route/user.js")],
};
var swaggerJson = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
};
const swaggerSpec = swaggerJSDoc(options);

var swaggerInstall = function (app) {
    if (!app) {
        app = express();
    }
    // 此路径用于向YApi导入接口文档
    app.get("/swagger.json", swaggerJson);
    // 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由。swagger访问前缀
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerInstall;
