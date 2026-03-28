import React from 'react';
import styles from './NowServing.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import TokenCard from '../TokenCard/TokenCard'

const NowServing=({token})=>{
    return(
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <FontAwesomeIcon icon={faPlay}/>
                    <h4>NOW SERVING</h4>
                </div>
                {
                    token ? (
                        <TokenCard token={token} type="current"/>
                    ) : (
                        <p>No active token</p>
                    )
                }
            </div>
        </>
    )
}

export default NowServing;