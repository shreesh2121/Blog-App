const express = require("express");
const { createBlog, updateBlog, deleteBlog, getAllProducts } = require("../Controller/blogController");
const { verifyToken } = require("../Controller/userController");
const router = express.Router();
router.get("/getallproduct",getAllProducts)
router.post("/createblog",createBlog );
router.put("/updateblog/:id",verifyToken,updateBlog );
router.delete("/deleteblog/:id",verifyToken,deleteBlog );

// router.get('/user', verifyToken,protected);

module.exports = router;