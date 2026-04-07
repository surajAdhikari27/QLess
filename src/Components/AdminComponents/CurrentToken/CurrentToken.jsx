import React from 'react'
import styles from './CurrentToken.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRotateRight,
    faArrowRightToBracket,
    faClock,
} from '@fortawesome/free-solid-svg-icons'

function CurrentToken({token, handleCallNext}){
    return(
        <>
        <div className={styles.currentToken}>
            <p className={styles.badge}>CURRENTLY SERVING</p>
            <div className={styles.circle}>
                {token ? (
                    <>
                        <h1>#{token.tokenNumber}</h1>
                        <p className={styles.activeName}>{token.name}</p>
                    </>
                ) : (
                    <>
                        <span className={styles.emptyIcon}>
                            <FontAwesomeIcon icon={faArrowRightToBracket}/>
                        </span>
                        <p className={styles.emptyText}>Empty Desk</p>
                    </>
                )}
            </div>
            <button onClick={handleCallNext}>
                <FontAwesomeIcon icon={faArrowRotateRight}/>
                Call Next Person
            </button>
            <div className={styles.helperText}>
                <FontAwesomeIcon icon={faClock}/>
                <span>{token ? "Serving in progress." : "No one is waiting right now."}</span>
            </div>
        </div>
        </>
    )
}

export default CurrentToken;