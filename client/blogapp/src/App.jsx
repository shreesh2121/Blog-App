import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBlog from "./Components/CreateBlog";
// import Container from './Components/Container'
import Header from "./Components/Header";
import MyProfile from "./Components/MyProfile";
import Register from "./Pages/Register";
import Home from "./Components/Home";
import Login from "./Pages/Login";
function App() {
  return (
    <BrowserRouter className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <CreateBlog /> */}
      {/* <MyProfile blogs={blogs}/> */}
      {/* <MyBlog/> */}
    </BrowserRouter>
  );
}

export default App;
