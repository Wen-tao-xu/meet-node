const db = require('./dbControl');
// 查询实例
db.query('SELECT id,name,url,alexa,country FROM websites', [], function(result, fields) {
    console.log('查询结果：');
    console.log(result);
});
////添加实例
// var addSql = 'INSERT INTO websites(id,name,url,alexa,country) VALUES(0,?,?,?,?)';
// var addSqlParams = ['许仙', 'https://www.baidu.com','23453', 'CN'];
// db.query(addSql, addSqlParams, function(result, fields) {
//    console.log('添加成功')
// })