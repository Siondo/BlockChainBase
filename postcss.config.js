const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-plugin-px2rem')

module.exports = {
    "plugins": [autoprefixer(), px2rem({
        rootValue: 75,
        propBlackLst: ['border'],
        exclude: /(node_module)/,
        selectorBlackList: ['var-', 'el-'],
        mediaQuery: false,
        minPixelValue: 2,
    })],
}