import {createSlice} from '@reduxjs/toolkit';

const initialState={
    status: false,
    userData: null,
    loading: false
};

export const AuthSlice= createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action)=>{
            state.status= true;
            state.userData= action.payload;
            state.loading= false;
        },
        logout: (state, action)=>{
            state.userData=null;
            state.status= false;
            state.loading=false;
        },
        setLoading: (state, action)=>{
            state.loading= action.payload;
        }
    }
})

export const {login, logout, setLoading}=AuthSlice.actions;
export default AuthSlice.reducer;