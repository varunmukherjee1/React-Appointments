import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userInfo",
    initialState:{
        user: null
    },
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload;
        }
    }
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;