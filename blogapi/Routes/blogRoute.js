const express = require("express");
const { createBlog, updateBlog, deleteBlog, getAllProducts } = require("../Controller/blogController");
const router = express.Router();
router.get("./getallproduct",getAllProducts)
router.post("/createblog",createBlog );
router.post("/updateblog",updateBlog );
router.post("/deleteblog",deleteBlog );

// router.get('/user', verifyToken,protected);

module.exports = router;