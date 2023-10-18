import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    user:{},
}
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
       setUser:(state,action)=>{
        state.user=action.payload;
       },
       clearUser:(state)=>{
        state.user=null
       },
    },
});

export const { setUser,clearUser } = UserSlice.actions;

export const loadUser=()=> async(dispatch)=>{
    try{
        const token=localStorage.getItem("token");
        const GetIn={
            headers:{
                "Content-Type": "application/json",
                // Authorization:`Bearer ${token}`,
                Authorization: `Token ${token}`,
            },
        }
        console.log(GetIn);

        if(token){
            const response=await axios.get("http://localhost:7000/blogapi/getin",GetIn);
            if(response.status===200){
                dispatch(setUser(response.data));
            }
        }
    }catch(error){
        console.log(error);
    }
}

export default UserSlice.reducer