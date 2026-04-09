import React,{ useState, useEffect  } from 'react'
import {useDispatch} from 'react-redux';
import {login,logout} from '../src/store/AuthSlice' 
import AppwriteAuthService from "../src/AppwriteServices/AppwriteAuth"
import AppwriteUserService from "../src/AppwriteServices/AppwriteUser"
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from '../src/Pages/HomePage'
import DashboardPage from '../src/Pages/DashboardPage/DashboardPage'
import AdminPage from '../src/Pages/AdminPage/AdminPage'
import LoginPage from '../src/Pages/LoginPage/LoginPage'
import TokenPage from '../src/Pages/TokenPage/TokenPage'
import ProtectedAdmin from '../src/Components/ProtectedAdmin';
import Navbar from '../src/Components/HomePageComponents/Navbar/Navbar';


function App() {
  const dispatch= useDispatch();

  useEffect(()=>{
    const checkUser=async()=>{
      try{
        const user= await AppwriteAuthService.getCurrentUser();
        if(user){
          const existing= await AppwriteUserService.getUserByID(user.$id);

          if(existing.documents.length===0){
            await AppwriteUserService.createUserDocument({
              userID: user.$id,
              email: user.email,
              role: "admin"
            })
          }
          const role= await AppwriteUserService.getUserRole(user.$id);
          dispatch(login({...user,role:"admin"}));
        }
        else{
          dispatch(logout());
        }
      }
      catch(error){
        console.log("Login error :: ", error);
        dispatch(logout());
      }
    };
    checkUser();
  },[]);

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/token" element={<TokenPage/>}/>
        <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminPage />
          </ProtectedAdmin>
        }
        />
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
