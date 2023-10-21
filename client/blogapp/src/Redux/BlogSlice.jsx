import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.maxBodyLength="http://localhost:7000/blogapi";

export const fetchAllBlogs=createAsyncThunk("blogs/fetchAllBlogs",async()=>{
    const response=await axios.get("/getallproduct");
    return response.data;
});

export const createBlogPost=createAsyncThunk("blogs/createBlogPost",async(newPost)=>{
    const response=await axios.post("/createblog",newPost);
    return response.data;
});

export const updateBlogPost=createAsyncThunk("blogs/UpdatedPost",async(updatedPost)=>{
const response=await axios.put(`/updateblog/${updatedPost.id}`,updatedPost);
return response.data;
});

export const deleteBlogPost = createAsyncThunk("blogs/deleteBlogPost", async (postId) => {
    await axios.delete(`/deleteblog/${postId}`);
    return postId;
  });

const initialState={
    posts:[],
    status:"idle",
    // loading:false,
    error:null,
}

const BlogSlice=createSlice({
    name:"blogs",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllBlogs.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchAllBlogs.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.data=action.payload;
            state.error=null;
        })
        .addCase(fetchAllBlogs.rejected,(state)=>{
            state.status="failed";
            state.error=action.error.message;
        })
        .addCase(createdBlogPost.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.posts.push(action.payload);
        })
        .addCase(updateBlogPost.fulfilled,(state,action)=>{
            state.status="succeeded";
            const{id,Title,Description,CreatedBy}=action.payload;
            const postIndex=state.posts.findIndex((post)=>post.id===id);
            if(postIndex !== -1){
                state.posts[postIndex]={id,Title,Description,CreatedBy};
            }
        })
        .addCase(deleteBlogPost.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.postI=action.payload;
            state.posts = state.posts.filter((post) => post.id !== postId);

        })
    }
})
export default BlogSlice.reducer;




// Notes:
// 1). axios.defaults.baseURL = "http://localhost:7000/blogapi"; sets the base URL for all Axios requests to "http://localhost:7000/blogapi". This means that when you make a request like axios.get("/getallproduct"), Axios will send the request to http://localhost:7000/blogapi/getallproduct because it appends the relative URL "/getallproduct" to the baseURL.
// 2). createAsyncThunk is a function provided by Redux Toolkit for creating asynchronous action creators. It takes two arguments:
// The first argument is a string that serves as a unique identifier for the action. In this case, it's set to "blogs/createBlogPost".
// The second argument is an asynchronous function that performs the actual API request or any other asynchronous operation. It receives a parameter, newPost, which should contain the data for the new blog post.