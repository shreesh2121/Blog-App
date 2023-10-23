import React, { useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CreateBlog from "./Components/CreateBlog";
// import Container from './Components/Container'
import Header from "./Components/Header";
// import MyProfile from "./Components/MyProfile";
import Register from "./Pages/Register";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import { useDispatch } from "react-redux";
import { loadUser } from "./Redux/UserSlice";
// import MyEditor from "./Components/MyEditor";
import CreateBlog from "./Components/CreateBlog";

function App() {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch])
  return (
    <BrowserRouter className="App">
      <Header />
      {/* <MyEditor/> */}
      {/* <CreateBlog/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
