const fs=require('fs')
const {addArticleService,getArticleList,getOwnArticle,getArticleCount,getOwnArticleCount,selectArticle,deleteArticleService,updateArticleServices}=require('../services/article')
const {getUserInfo}=require('../services/user')

/* exports.uploadImg=(req,res) => {
  global.cover=`/img/${req.file.filename}`
} */
//添加文章
exports.addArticle =async (req, res) => {

  let result=await addArticleService(req.body)
  if(result){
    res.send({
        code:200,
        message:'添加文章成功',
    })
  }else{
    res.cc('添加失败')
  }
};

//上传图片

exports.uploadImg = (req, res) => {
  let files = req.files;
  let file = files[0];
  let fileInfo = {};
  let path = "./public/img/" + Date.now().toString() + "_" + file.originalname;
  fs.renameSync("./public/img/" + file.filename, path);
  //获取文件基本信息
  fileInfo.type = file.mimetype;
  fileInfo.name = file.originalname;
  fileInfo.size = file.size;
  fileInfo.path = path;
  res.send({
    code: 200,
    msg: "OK",
    data: fileInfo,
  });
};
//获取文章列表
exports.getAttrList=async (req,res) => {
  //拿到客户端的参数
  const{page,limit}=req.params
  //获取个人信息
  let info=await getUserInfo(req.user._id)
  //如果用户是超级管理员，可以查看所有文章
  if(info.role=='超级管理员'){
    let result=await getArticleList(page,limit)
    if(result){
      //查询所有数据个数
      let count=await getArticleCount()
        res.send({
            code:200,
            message:'查询成功',
            data:result,
            totle:count
        })
    }else{
        res.cc('查询失败')
    }
  }else{
    //普通用户
    let ownArticle=await getOwnArticle(req.user._id,page,limit)
    let count=await getOwnArticleCount(req.user._id)
    if(info){
        res.send({
            code:200,
            message:'查询成功',
            data:ownArticle,
            totle:count
        })
    }else{
        res.cc('查询失败')
    }
  }
    
}
//关键词查询文章
exports.selectArticle=async (req,res) => {
  await selectArticle(req.body.keywords).then((result) => {
    res.send({
      code:200,
      data:result
    })
  }).catch((err) => {
    res.cc(err)    
  });
}
//更新文章
exports.updateArticle=async (req,res) => {
  const {_id,title,publishiDate,cover,content}=req.body
  console.log(req.body);
  await updateArticleServices(_id,title,publishiDate,cover,content).then((result) => {
    console.log(result);
    res.send({
      code:200,
      message:'更新成功'
    })
  }).catch((err) => {
    res.cc(err)
  });
}
//删除文章
exports.deleteArticle=async (req,res) => {
  await deleteArticleService(req.body._id).then((result) => {
    console.log(req.body);
    res.send({
      code:200,
      message:'删除成功!'
    })
  }).catch((err) => {
    res.send(err)
  });
}