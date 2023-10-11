var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectDB } = require("../Config/db");
const { Blog } = require("../Models/blog");

const getAllProducts =async (req, res) => {
    const allBlogs = await Blog.find();
    res.status(201).json(allBlogs);
 
  };

const createBlog = async (req, res) => {
  try {
    //get all data from frontend
    const { Title, Description, CreatedBy } = req.body;
    //all data should exists
    if (!(Title && Description && CreatedBy)) {
      res.status(400).send("All fields are compulsory");
    }
    // Create Product
    const blog = await Blog.create({
      Title,
      Description,
      CreatedBy,
      // user_id:userId,
    });
    res.status(201).json(blog);

  } catch (error){
    console.log(error);

  }
};
const updateBlog = async (req, res) => {
    //get all data from frontend
    const { Title, Description, CreatedBy } = req.body;
  
    //all data should exists
    if (!(Title && Description && CreatedBy)) {
        res.status(400).send("All fields are compulsory");
      } else {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
      res.json(blog);
    }
  };
  const deleteBlog= async (req, res) => {
    const blog = await Product.findByIdAndDelete(req.params.id);
    res.send("Item has been deleted");
  };

module.exports = { createBlog,updateBlog,deleteBlog ,getAllProducts};
