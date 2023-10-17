import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CreateBlog from "./Components/CreateBlog";
// import Container from './Components/Container'
import Header from "./Components/Header";
// import MyProfile from "./Components/MyProfile";
import Register from "./Pages/Register";
import Home from "./Components/Home";
import Login from "./Pages/Login";
// import MyBlog from "./Components/MyBlog";
// import AllBlogs from "./Components/AllBlogs";
function App() {
  const [user,setUser]=useState(null);
  return (
    <BrowserRouter className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login  setUser={setUser}/>} />
      </Routes>
      {/* <CreateBlog /> */}
      {/* <MyProfile blogs={blogs}/> */}
      {/* <AllBlogs/> */}
    </BrowserRouter>
  );
}

export default App;
