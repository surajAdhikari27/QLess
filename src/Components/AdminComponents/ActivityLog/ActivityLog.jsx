import React from 'react';
import styles from './ActivityLog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

function ActivityLog({ tokens }) {
    const sorted = [...tokens].sort(
        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
    );

    const getStatusText = (status) => {
        if (status === "waiting") return "GENERATED";
        if (status === "current") return "CALLING";
        if (status === "completed") return "DONE";
    };

    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getDotClass = (status) => {
        if (status === "waiting") return styles.waiting;
        if (status === "current") return styles.current;
        return styles.completed;
    };

    const getStatusClass = (status) => {
        if (status === "waiting") return styles.statusWaiting;
        if (status === "current") return styles.statusCurrent;
        return styles.statusCompleted;
    };

    return (
        <div className={styles.activityLog}>
            <div className={styles.header}>
                <FontAwesomeIcon icon={faClock}/>
                <h3>Activity Log</h3>
            </div>

            {sorted.slice(0, 50).map((token) => (
                <div className={styles.card} key={token.$id}>

                    <div className={styles.row}>
                        <div className={styles.left}>
                            <span className={`${styles.dot} ${getDotClass(token.status)}`} />
                            <span className={styles.tokenNumber}>
                                #{token.tokenNumber}
                            </span>
                        </div>

                        <span className={`${styles.status} ${getStatusClass(token.status)}`}>
                            {getStatusText(token.status)}
                        </span>
                    </div>

                    <p className={styles.name}>{token.name}</p>
                    <p className={styles.time}>
                        {formatTime(token.$createdAt)}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ActivityLog;