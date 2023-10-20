import React from "react";
import AllBlogs from "./AllBlogs";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import { clearUser } from "../Redux/UserSlice";
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
console.log(user.user);
console.log(user.user.name);
  // Check if either user.user or localUser is available
  const userName = user.user?.name || (localUser && localUser.name);

// console.log(userName);
  return (

    <div>
      {user?.user?.name}
      {/* {userName ? <p>Welcome, {userName}</p> : <p>Welcome to our blog!</p>} */}
      <AllBlogs />
    </div>
    //  <div>
    //   {user.user && user.user.name ? (
    //     <p>Welcome, {user.user.name}</p>
    //   ) : (localUser && localUser.name ? (
    //     <p>Welcome, {localUser.name}</p>
    //   ) : (
    //     <p>Welcome to our blog!</p>
    //   )
    //   )}
    //   <AllBlogs />
    // </div>
  
  );
}

export default Home;
