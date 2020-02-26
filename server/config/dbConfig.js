const Sequelize = require('sequelize');

const {
    dbName,
    host,
    port,
    user,
    password
} = require('./config').database;

let sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true, // 这个为true，执行的时候，才会在控制台打出相应的数据库语句
    timezone: '+08:00',
    define: {   // 个性化配置
        timestamp: true, // create_time、uptate_time
        paranoid: true,  // delete_time
        createdAt: 'created_at', // 把字段名字改成自定义的
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true // 把所有的驼峰命名式的字段变成下划线的
    }
})

// 只有这个方法，models层的代码才会往数据库中加入东西
sequelize.sync({
    force: true // 这个为true的时候，重新执行时，会删除整一个数据表，重新创建一个，所以这个不要随便加
});


module.exports = {
    sequelize
}