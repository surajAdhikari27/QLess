import React, {useState, useEffect} from 'react'
import Completed from '../../Components/DashboardComponents/Completed/Completed'
import NowServing from '../../Components/DashboardComponents/NowServing/NowServing'
import ProgressBar from '../../Components/DashboardComponents/ProgressBar/ProgressBar'
import QueueHeader from '../../Components/DashboardComponents/QueueHeader/QueueHeader'
import StatsCard from '../../Components/DashboardComponents/StatsCard/StatsCard'
import UpNext from "../../Components/DashboardComponents/UpNext/UpNext"
import AppwriteTokensService from '../../AppwriteServices/AppwriteTokens'
import styles from './DashboardPage.module.css';


function DashboardPage(){
    const [tokens, setTokens]= useState([]);

    const fetchTokens= async()=>{
        const response= await AppwriteTokensService.getAllTokens();
        setTokens(response.documents);
    }

    useEffect(()=>{
        fetchTokens();
    },[])

    const currentToken= tokens.find((token)=>token.status==="current");
    const waitingTokens= tokens.filter((token)=>token.status==="waiting");
    const completedTokens= tokens.filter((token)=>token.status==="completed");

    const tokensWaiting= waitingTokens.length;
    const totalWaitTime= tokensWaiting*2;
    const totalTokens = tokens.length;
     const progress =
        totalTokens === 0
            ? 0
            : Math.round((completedTokens.length / totalTokens) * 100);


    return(
        <>
        <div className={styles.dashboard}>
            <QueueHeader />
            <div className={styles.statsCard}>
                <StatsCard
                    title="TOTAL WAIT TIME"
                    value={`~${totalWaitTime} min`}
                />
                <StatsCard
                    title="TOKENS WAITING"
                    value={tokensWaiting}
                />
            </div>
            <div className={styles.progress}>
                <ProgressBar progress={progress} />
            </div>
            <div className={styles.queueStatus}>
                <NowServing token={currentToken}/>
                <UpNext token={waitingTokens}/>
                <Completed token={completedTokens}/>
            </div>
        </div>
        </>
    )
}

export default DashboardPage;
