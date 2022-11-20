const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addArticle,getAttrList,selectArticle,updateArticle,deleteArticle,uploadImg } = require("../controller/articleController");
router.post("/addArticle", addArticle);
router.post("/upload",multer({dest: "./public/img",}).array("file", 1),uploadImg);
router.get('/getArticleList/:page/:limit',getAttrList)
router.post('/selectArticle',selectArticle)
router.post('/updateArticle',updateArticle)
router.post('/deleteArticle',deleteArticle)
/* multer({dest: "./public/img",}).array("file", 1) */

module.exports = router;
