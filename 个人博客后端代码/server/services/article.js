const Article=require('../model/article')
exports.addArticleService=(data) => {
    return Article.create(data)
}
//获取所有人的文章
exports.getArticleList=(page,limit) => {
    return Article.find().skip((page-1)*limit).limit(limit)
}
//获取自己发布的文章
exports.getOwnArticle=(author,page,limit) => {
    return Article.find({author}).skip((page-1)*limit).limit(limit)
}
//查询所有文章个数
exports.getArticleCount=() => {
    return Article.count()
}
//查询个人文章个数
exports.getOwnArticleCount=(_id) => {
    return Article.count({author:_id})
}
//关键词查询文章
exports.selectArticle=(keywords) => {
    return Article.find({title:keywords})
}
//删除文章
exports.deleteArticleService=(_id) => {
    return Article.deleteOne({_id})
}
//更新文章
exports.updateArticleServices=(_id,title,publishiDate,cover,content) => {
    return Article.updateOne({_id},{title,publishiDate,cover,content})
}