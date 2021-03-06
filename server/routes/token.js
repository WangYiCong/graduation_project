const Router = require('koa-router');
const router = new Router();

const { 
    TokenValidator,
    NotEmptyValidator
} = require('../validators/validators');
const { LoginType } = require('../validators/enumType');
const { User } = require('../models/userModel');
const { WXManager } = require('../models/wxModel');
const { generateToken } = require('../utils/util');
const { Permission } = require('../utils/permission');


router.post('/token', async (ctx) => {
    const v = await new TokenValidator().validate(ctx);
    let userToken;
    
    // 针对登录类型的处理，需要返回什么给前端
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL: // 普通邮箱的登录

            const account = v.get('body.account');
            const secret = v.get('body.secret');
            userToken = await emailLogin(account, secret);

            break;
        case LoginType.USER_MINI_PROGRAM: // 小程序登录
            
            const code = v.get('body.account');
            userToken = await WXManager.codeToToken(code);

            break;
        case LoginType.USER_MOBILE: // 手机号登录

            break;
        default:
            throw new global.errors.ParameterException('没有相应的处理函数');
    }
    ctx.body = {
        userToken
    }
})

router.post('/token/verify', async (ctx) => {
    const v = await new NotEmptyValidator().validate(ctx);
    const token = v.get('body.token');
    const result = Permission.verifyToken(token);
    ctx.body = {
        isValid: result
    }
})

// 邮箱和密码登录
async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret);
    return generateToken(user.id);
}

// 微信登录，单独抽取一个wxModel.js文件出来

// 手机号登录（扩展）

module.exports = router;