import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CreateBlog from './Components/CreateBlog'
// import Container from './Components/Container'
import Header from './Components/Header'
import MyProfile from './Components/MyProfile'
// import MyBlog from './Components/MyBlog'

function App() {
  
  return (
    <>
    <Header/>
    <CreateBlog />
    {/* <MyProfile blogs={blogs}/> */}
    {/* <MyBlog/> */}
    </>
  )
}

export default App
