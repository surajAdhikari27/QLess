import React from 'react';
import styles from './UpNext.module.css';
import TokenCard from '../TokenCard/TokenCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const UpNext=({token})=>{
    return(
        <>
        <div className={styles.upNextContainer}>
            <div className={styles.header}>
                <FontAwesomeIcon icon={faClock} />
                <h4>UP NEXT</h4>
            </div>
            {
                token.length === 0 ? (
                    <p>No Tokens</p>
                ) : (
                    token.map((t, index) => (
                        <TokenCard
                            key={t.$id}
                            token={t}
                            type={index === 0 ? "next" : "default"}
                        />
                    ))
                )
            }
        </div>
        </>
    )
}

export default UpNext;