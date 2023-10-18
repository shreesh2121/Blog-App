import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
const Store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default Store;
