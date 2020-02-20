const db = require('./dbControl');
let express = require('express');
let app = express();
let arr = [];
// 查询实例
db.query('SELECT id,name,url,alexa,country FROM websites', [], function(result, fields) {
    app.get('/select', function(req, res) {
        res.send(result);
    });
});
app.listen(3000, res => {
    console.log("http://localhost:3000/select")
});