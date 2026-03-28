import React from 'react';
import styles from './QueueHeader.module.css'

function QueueHeader(){

    return(
        <>
        <div className={styles.QueueHeader}>
            <h1>Live Queue</h1>
            <p>Real-time status of all virtual tokens.</p>
        </div>
        </>
    )
}

export default QueueHeader;