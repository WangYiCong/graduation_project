/**
 * @description 路由文件不要写过多的处理数据的函数，尽量只写前端请求过来的数据赋值就行，
 *              处理数据的函数一般放在Model层
 */
const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/user' // 前缀功能，在每一个请求路径前面加
});
const { Permission } = require('../../utils/permission');

// const bcrypt = require('bcryptjs'); // 密码加密

const { RegisterValidator } = require('../../validators/validators'); // 注册校检

const { User } = require('../../models/userModel'); // 用户model层，一般用来操作数据库的

router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx);
    /**
     * 把密码加密，后面这个10（位数） ，是生成盐的成本，不能乱设置，设置过大会耗尽服务器资源
     * 1、对两个相同的代码，加密后的密码是不一样的
     * 2、可以避免彩虹攻击
     * @description 我们把这个加密放到models层了
     */ 
    // const salt = bcrypt.genSaltSync(10);
    // const encryptPassword = bcrypt.hashSync(v.get('body.confirmPassword'), salt);

    const user = {
        nickname: v.get('body.nickname'),
        // password: encryptPassword,
        password: v.get('body.confirmPassword'),
        email: v.get('body.email')
    }

    const r = await User.create(user);

    throw new global.errors.Success(); // 请求成功了，抛出自定义的成功异常
   
})

router.post('/userinfo', new Permission().isCorrectToken, async (ctx, next) => {
    const userInfo = {
        nickname: ctx.request.body.nickName,
        avatarurl: ctx.request.body.avatarUrl
    }
    const uid = ctx.auth.uid;

    const user = await User.update(userInfo,{
        where:{
            id: uid
        }
    });
    if(user) {
        throw new global.errors.Success();
    }
})


module.exports = router;

