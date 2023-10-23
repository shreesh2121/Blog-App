import React from "react";
import AllBlogs from "./AllBlogs";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
function Home() {
  const user = useSelector((state) => state.user);
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
      <AllBlogs />
    </div>
  
  
  );
}

export default Home;
