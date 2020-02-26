const { Rule, LinValidator } = require('../utils/lin-validator');
const { User } = require('../models/userModel');
/**
 * 参数规范
 */
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '参数必须的正整数')
        ]
    }
}

/**
 * 注册校验
 */
class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ];
        this.password = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ];
        this.confirmPassword = this.password;
        this.email = [
            new Rule('isEmail', '不符合Email规范~')
        ];
    }
    // 确认两个密码是否一致
    validatePassword(vals) {
        const psw1 = vals.body.password
        const psw2 = vals.body.confirmPassword
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }


}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}