// import _ from 'lodash'
// 引用lodash插件
const _ = require('lodash');
// 授权完成后自动化注册方法
export const autoRegister = (leng) => {
    let _charStr = 'abacdefghjklmnopqrstuvwxyz@#$%*-+0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
    let str = ''
    for (let i = 0; i < _.random(leng, leng + 6); i++) {
        let userNameI = _charStr[_.random(0, _charStr.length - 1)]
        str += userNameI
    }
    return str
}
