import React from 'react';
import styles from './AdminStatsCard.module.css'

function AdminStatsCard({icon, title, value, variant}){
    return(
        <>
        <div className={styles.adminStatsCard}>
            <div className={`${styles.title} ${variant === "served" ? styles.served : styles.waiting}`}>
                {icon}
                <p>{title}</p>
            </div>
            <h2>{value}</h2>
        </div>
        </>
    )
}


export default AdminStatsCard;