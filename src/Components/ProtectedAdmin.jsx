import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

function ProtectedAdmin({children}){
    const {userData}= useSelector((state)=>state.auth);

    if(!userData){
        return <Navigate to="/login"/>;
    }
    if(userData.role!== "admin"){
        return <Navigate to="/"/>
    }
    return children;
};
export default ProtectedAdmin;