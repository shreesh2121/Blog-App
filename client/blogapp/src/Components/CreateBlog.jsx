import * as React from "react";
import axios from "axios";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState,useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBlogPost, deleteBlogPost, fetchAllBlogs, updateBlogPost } from "../Redux/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import "./CreateBlog.css"; // Import a CSS file for styling


export default function CreateBlog() {
  const dispatch=useDispatch();
  // const posts=useSelector((state)=>state.blogs.posts);
  // const status=useSelector((state)=>state.blogs.status);

  const [newPost, setNewPost] = useState({  CreatedBy: "",Title: "", Description: "" });


  const handleCreatePost = () => {
    if (newPost.Title && newPost.Description && newPost.CreatedBy) {
      dispatch(createBlogPost(newPost));
      setNewPost({ Title: "", Description: "", CreatedBy: "" });
    }
  };

  const isCreateButtonDisabled =
    !newPost.CreatedBy || !newPost.Title || !newPost.Description;

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const commonStyles = {
    bgcolor: "background.paper",
    m: 1,
    borderColor: "text.primary",
    width: "5rem",
    height: "5rem",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );


  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60%",
          width: "60%",
          border: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircleIcon />
          <TextField
            id="filled-basic"
            label="Enter your Name"
            variant="filled"
            name="CreatedBy"
            value={newPost.CreatedBy}
            onChange={(e) => setNewPost({ ...newPost, CreatedBy: e.target.value })}
            // onChange={handleChange}
            sx={{ flex: 1 }}
            // Let the TextField occupy the available width
          />
        </Box>

        <Box sx={{ width: "50%", mb: 2 }}>
          {" "}
    
          <textarea
            aria-label="empty textarea"
            placeholder="Enter Title"
            name="Title"
            value={newPost.Title}
            onChange={(e) => setNewPost({ ...newPost, Title: e.target.value })}
            className="responsive-textarea"
            />
        </Box>

        <Box sx={{ width: "50%" }}>

        <textarea
            aria-label="empty textarea"
            placeholder="Description"
            name="Description"
            value={newPost.Description}
            onChange={(e) => setNewPost({ ...newPost, Description: e.target.value })}
            className="responsive-textarea"
            sx={{ width:"100%" }}
          />
  
        </Box>
        <Button
          variant="contained"
          onClick={handleCreatePost}
          disabled={isCreateButtonDisabled}
        >
          Create Blog
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
}
