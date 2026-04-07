import React from 'react';
import {useNavigate} from 'react-router-dom';
import AppwriteAuthService from '../../AppwriteServices/AppwriteAuth';
import {setLoading} from "../../store/AuthSlice"
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './LoginPage.module.css';

function Login(){
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const {loading}= useSelector((state)=>state.auth);
    
    const handleGoogleLogin=()=>{
        try{
            dispatch(setLoading(true));
            AppwriteAuthService.loginWithGoogle();
        }
        catch(error){
            console.log("Login error :: ",error);
            dispatch(setLoading(false));
        }
    }
    return(
        <>
        <div className={styles.loginPage}>
            <div className={styles.card}>
                <h1>Welcome Back</h1>
                <p>Login to access Admin Panel</p>
                <button
                    className={styles.button}
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    {loading ? "Redirecting..." : "Continue with Google"}
                </button>
                <p className={styles.back} onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    Back to Home
                </p>
            </div>
        </div>
        </>
    )
}

export default Login;
