import React from 'react';
import styles from './HeroSection.module.css'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faUser } from '@fortawesome/free-solid-svg-icons'

function HeroSection(){
    const navigate= useNavigate()

    const handleAdminBtn=()=>{
        navigate('/admin')
    }

    const handleTokenBtn=()=>{
        navigate("/token")
    }

    return(
        <>
        <div className={styles.heroSection}>
            <div className={styles.heading}>
                <h1>Skip the Line.</h1>
                <h1>Own Your Time.</h1>
            </div>

            <div className={styles.description}>
                <p>
                    QLess is a digital queue management system designed to make waiting effortless.
                    Reserve your spot virtually and show up just when you're needed.
                </p>
            </div>

            <div className={styles.buttons}>
                <button
                    className={styles.tokenBtn}
                    type="button"
                    onClick={handleTokenBtn}
                >
                    Take a token
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </button>

                <button
                    className={styles.adminBtn}
                    type="button"
                    onClick={handleAdminBtn}
                >
                    <FontAwesomeIcon icon={faUser} />
                    Admin Panel
                </button>
            </div>
        </div>
        </>
    )
}

export default HeroSection;