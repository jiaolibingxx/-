import request from '@/utils/request'
//增加文章
export const addArticle=(data) => {
    return request({
        url:'/article/addArticle',
        method:'post',
        data
    })
}
//获取文章列表
export const getArticleList=(page,limit) => {
    return request({
        url:`/article/getArticleList/${page}/${limit}`,
        method:'get',
    })
}
//关键字查询文章
export const selectArticle=(data) => {
    return request({
        url:'/article/selectArticle',
        method:'post',
        data
    })
}
//删除文章
export const deleteArticle=(data) => {
    return request({
        url:'/article/deleteArticle',
        method:'post',
        data
    })
}
//更新文章
export const updateArticle=(data) => {
    return request({
        url:'/article/updateArticle',
        method:'post',
        data
    })
}