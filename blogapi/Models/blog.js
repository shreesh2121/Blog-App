const mongoose=require("mongoose");

// creating blog schema
const blogSchema=new mongoose.Schema({
    Title:{
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required:true,
    },
    CreatedBy: {
        type: String,
    },
},
{
    timestamps: true
})
// Create a Message model based on the schema
const Blog=mongoose.model("blog", blogSchema);

// Export the Message model and the messageSchema
module.exports={
    Blog
}