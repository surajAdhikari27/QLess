import React from 'react';
import styles from './AdminHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowRotateRight, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'


function AdminHeader({handleReset, handleCallNext, handleClearLogs}){

    return(
        <>
        <div className={styles.adminHeader}>
            <div className={styles.adminPanelDetails}>
                <h1>
                    <FontAwesomeIcon icon={faUser}/>
                    Admin Panel
                </h1>
                <p>Manage the queue and call the next token.</p>
            </div>
            <div className={styles.actionsButton}>
                <button onClick={handleReset}>
                    <FontAwesomeIcon icon={faArrowRotateRight}/>
                    Reset
                </button>

                <button onClick={handleClearLogs} className={styles.clearBtn}>
                    <FontAwesomeIcon icon={faTrash}/>
                    Clear Logs
                </button>

                <button onClick={handleCallNext}>
                    Call Next
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
        </>
    )
}

export default AdminHeader;