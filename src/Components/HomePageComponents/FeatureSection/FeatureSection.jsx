import React from 'react'
import styles from './FeatureSection.module.css'
import FeatureCard from "../FeatureCard/FeatureCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket, faClock, faBolt } from '@fortawesome/free-solid-svg-icons'


function FeatureSection(){

    return(
        <>
        <div className={styles.container}>
            <div className={styles.headings}>
                <h2>How QLess Works</h2>
                <p>A seamless experience for both users and administrators.</p>
            </div>

            <div className={styles.cards}>
                <FeatureCard 
                    icon={<FontAwesomeIcon icon={faTicket}/>}
                    title="Get Your Token"
                    description="Enter your name and grab a virtual token with one click."
                />

                <FeatureCard 
                    icon={<FontAwesomeIcon icon={faClock}/>}
                    title="Wait Anywhere"
                    description="Keep track of your estimated wait time on the live dashboard."
                />

                <FeatureCard 
                    icon={<FontAwesomeIcon icon={faBolt}/>}
                    title="It's Your Turn"
                    description="Get notified instantly when the admin is ready to serve you."
                />
            </div>
        </div>
        </>
    )
}

export default FeatureSection;