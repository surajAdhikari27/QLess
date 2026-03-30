import React from 'react'
import styles from './CurrentToken.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

function CurrentToken({token, handleCallNext}){
    return(
        <>
        <div className={styles.currentToken}>
            <p>Currently Serving</p>
            <div className={styles.circle}>
                {token ? (
                    <>
                        <h1>#{token.tokenNumber}</h1>
                        <p>{token.name}</p>
                    </>
                ) : (
                    <p>No Active tokens</p>
                )}
            </div>
            <button onClick={handleCallNext}>
                <FontAwesomeIcon icon={faArrowRotateRight}/>
                Call Next Person
            </button>
        </div>
        </>
    )
}

export default CurrentToken;