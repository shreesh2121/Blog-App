import React from "react";
import AllBlogs from "./AllBlogs";

function Home({user}) {
  return <div>
    {user?( <p>Welcome, {user.name}</p>):( <p>Welcome to our blog!</p>)}
    <AllBlogs/>
  </div>;
}

export default Home;
