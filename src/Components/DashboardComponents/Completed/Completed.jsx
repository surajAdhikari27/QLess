import React from 'react';
import styles from './Completed.module.css';
import TokenCard from '../TokenCard/TokenCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const Completed=({token})=>{
    return(
        <>
        <div className={styles.completedContainer}>
            <div className={styles.header}>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <h4>COMPLETED</h4>
            </div>
            {
                token.length === 0 ? (
                    <p>No Completed Tokens</p>
                ) : (
                    token.map((t) => (
                        <TokenCard
                            key={t.$id}
                            token={t}
                            type="completed"
                        />
                    ))
                )
            }
        </div>
        </>
    )
}

export default Completed;