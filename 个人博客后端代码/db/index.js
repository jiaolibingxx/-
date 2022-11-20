const mongooes=require('mongoose')
mongooes.connect("mongodb://127.0.0.1/my_blog").then((result) => {
    console.log('数据库连接成功');
}).catch((err) => {
    console.log("数据库连接失败");
});