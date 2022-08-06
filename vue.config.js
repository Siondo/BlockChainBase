const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        plugins: [new NodePolyfillPlugin()
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
    },
    // 修改配置后一定要 重新npm run serve !!!
    devServer: {
        // vue项目启动时的ip地址和端口   用自己的端口号
        host: "localhost",
        port: 8000,
        proxy: {
            // 匹配所有以 /api 开头的url
            "/api": {
                // 请求的目标主机
                //target: "http://192.168.0.107:9090",
                target: "https://api.siondo.cn",
                changeOrigin: true,
                //这样重写会把,路径中 /api 消去
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [
    //                 require('postcss-plugin-px2rem')({
    //                     rootValue: 37.5,
    //                     propBlackLst:['border'],
    //                     exclude:/(node_module)/,
    //                     selectorBlackList:['var-','el-'],
    //                     mediaQuery:false,
    //                     minPixelValue:2,
    //                 })
    //             ]
    //         }
    //     }
    // }

},
);
// css:{
//     loaderOptions:{
//         css:{},
//         postcss:{
//             plugins:[
//                 require('postcss-px2rem')({
//                     remUnit: 37.5
//                 })
//             ]
//         }
//     }
// },

// const { defineConfig } = require("@vue/cli-service");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// module.exports = defineConfig({
//     transpileDependencies: true,
//     devServer: {
//         https: true,
//         http: true
//     },
//     configureWebpack: {
//         plugins: [new NodePolyfillPlugin()],
//         optimization: {
//             splitChunks: {
//                 chunks: "all",
//             },
//         },
//     },
// });

