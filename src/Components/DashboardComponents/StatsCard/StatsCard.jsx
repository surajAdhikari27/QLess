import React from 'react'
import styles from './StatsCard.module.css';

function StatsCard({title, value}){
    return(
        <>
        <div className={styles.statsCard}>
            <p>{title}</p>
            <h3>{value}</h3>
        </div>
        </>
    )
}

export default StatsCard;