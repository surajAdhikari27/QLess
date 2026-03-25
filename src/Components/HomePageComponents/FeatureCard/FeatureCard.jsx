import React from 'react'
import styles from './FeatureCard.module.css';

function FeatureCard({icon, title , description}){

    return(
        <>
            <div className={styles.featureCard}>
                <img src={icon} alt="icon"/>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </>
    )
}

export default FeatureCard;