import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userPost: null,
    Posts: []
}

const authSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        post: (state, action)=>{
            state.userPost = action.payload.userPost
        },
        posts: (state, action)=>{
            state.Posts = action.payload.Posts
        }
    }
})

export const {Post, Posts} = authSlice.actions

export default authSlice.reducer;