import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
      localStorage.removeItem("user");

    },
  },
});


export const { setUser, clearUser } = UserSlice.actions;


export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const GetIn = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Token ${token}`,
      },
    };
    console.log(GetIn);

    if (token) {
      const response = await axios.get(
        "http://localhost:7000/blogapi/getin",
        GetIn
      );
      if (response.status === 200) {
        dispatch(setUser(response.data));
        console.log(response.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const Logout=()=>(dispatch)=>{
    dispatch(clearUser());
    localStorage.removeItem("token")
    // setLocalUser(null);

    // console.log(token);
};

export default UserSlice.reducer;
