/**
 * @description 处理错误返回的接口对象，方便日后定位问题
 * 1、已知错误
 *  比如参数错误，参数类型不对等
 * 2、未知错误
 *  数据库密码错误等
 */
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super()
        this.msg = msg;
        // errorCode是开发者自己定义的具体错误
        this.errorCode = errorCode;
        this.code = code;
    }
}

// 一般200表示查询成功，提交成功应该用201
class Success extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

// 参数错误
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000   
    }
}

// 资源未找到
class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}

// 授权失败
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

// 
class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

class LikeError extends HttpException {
    constructor(msg, error_code) {
        super()
        this.code = 400
        this.msg = "你已经点赞过"
        this.error_code = 60001
    }
}

class DislikeError extends HttpException {
    constructor(msg, error_code) {
        super()
        this.code = 400
        this.msg = "你已取消点赞"
        this.error_code = 60002
    }
}


module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DislikeError
}