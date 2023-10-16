import * as React from "react";
import axios from 'axios';
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreateBlog() {
  const [formData, setFormData] = useState({
    CreatedBy: "",
    Title: "",
    Description: "",
  });

  const handleChange = (e) => {
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateBlog = () => {
    // Validate if any field is empty
    if (!formData.CreatedBy || !formData.Title || !formData.Description) {
      toast.error('All fields are required.', { position: 'top-right' });
      return;
    }

    // Create a new blog post object
    const newBlogPost = {
      CreatedBy: formData.CreatedBy,
      Title: formData.Title,
      Description: formData.Description,
    };
    console.log(newBlogPost);

    // Send a POST request using Axios
    axios
      .post('http://localhost:7000/blogapi/createblog', newBlogPost )
      .then((response) => {
        // Handle success, clear form, show success toast, or redirect to the created blog post
        setFormData({
          CreatedBy: '',
          Title: '',
          Description: '',
        });
        toast.success('Blog post created successfully.', { position: 'top-right' });
      })
      .catch((error) => {
        // Handle the error, show an error toast, or log the error
        console.error(error);
        toast.error('Failed to create the blog post.', { position: 'top-right' });
      });
  };
  

  // const handleCreateBlog = () => {
    
  //   if (!formData.CreatedBy || !formData.Title || !formData.Description) {
  //     toast.error("All fields are required.", { position: "top-right" });
  //     return;
  //   }
  //   setFormData({
  //       CreatedBy: "",
  //       Title: "",
  //       Description: "",
  //     });
  // };
  

  const isCreateButtonDisabled = !formData.CreatedBy || !formData.Title || !formData.Description;

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

  const StyledTextarea = styled("textarea")`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${({ theme }) => (theme.palette.mode === "dark" ? "#6e7781" : "#57606a")};
  background: ${({ theme }) => (theme.palette.mode === "dark" ? "#57606a" : "#fff")};
  border: 1px solid ${({ theme }) => (theme.palette.mode === "dark" ? "#424a53" : "#d0d7de")};
  box-shadow: 0px 2px 2px ${({ theme }) => (theme.palette.mode === "dark" ? "#57606a" : "#d0d7de")};

  &:hover {
    border-color: #3399FF;
  }

  &:focus {
    border-color: #3399FF;
    box-shadow: 0 0 0 3px ${({ theme }) => (theme.palette.mode === "dark" ? "#0072E5" : "#DAECFF")};
  }
`;
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
            value={formData.CreatedBy}
            onChange={handleChange}
            sx={{ flex: 1 }}
            // Let the TextField occupy the available width
          />
        </Box>
        <Box sx={{ width: "50%", mb: 2 }}>
          {" "}
          {/* Adjust the width and margin-bottom (mb) as needed */}
          <StyledTextarea
            aria-label="empty textarea"
            placeholder="Enter Title"
            sx={{ width: "100%" }} // Make it 100% of the parent Box
            name="Title"
            value={formData.Title}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <StyledTextarea
            aria-label="minimum height"
            minRows={10}
            placeholder="Minimum 3 rows"
            sx={{ width: "100%" }}
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleCreateBlog}
          disabled={isCreateButtonDisabled}
        >
          Create Blog
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
}
