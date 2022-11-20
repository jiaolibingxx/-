const mongoose=require('mongoose')
//创建文章集合规则
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        maxlength:20,
        minlength:4,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    publishiDate:{
        type:String,
    },
    cover:{
        type:String,
    },
    content:{
        type:String,
    }
})
//创建文章集合
const Article= mongoose.model('Article',articleSchema)
module.exports=Article