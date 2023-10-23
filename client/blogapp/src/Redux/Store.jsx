import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import BlogReducer from "./BlogSlice";
const Store = configureStore({
  reducer: {
    user: UserReducer,
    blog: BlogReducer,
  },
});

export default Store;
