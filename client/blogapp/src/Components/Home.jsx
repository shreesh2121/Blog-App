import React from "react";
import AllBlogs from "./AllBlogs";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
function Home() {
  const user = useSelector((state) => state.user);
    console.log(user.user.name);
    const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    // Get user data from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser)); // Parse the stored user data back to an object
    }
  }, []);
    // console
  return <div>

    {/* {user?( <p>Welcome, {user.name}</p>):( <p>Welcome to our blog!</p>)} */}
    {user.user.name?(<p>Welcome, {user.user.name}</p>):( <p>Welcome to our blog!</p>)}
    <AllBlogs/>
  </div>;
}

export default Home;
