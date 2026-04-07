import React,{useEffect, useState} from 'react';
import styles from './AdminPage.module.css';
import ActivityLog from '../../Components/AdminComponents/ActivityLog/ActivityLog'
import AdminHeader from '../../Components/AdminComponents/AdminHeader/AdminHeader'
import AdminStatsCard from '../../Components/AdminComponents/AdminStatsCard/AdminStatsCard'
import CurrentToken from '../../Components/AdminComponents/CurrentToken/CurrentToken'
import AppwriteTokensService from '../../AppwriteServices/AppwriteTokens'
import AppwriteQueueMetaService from '../../AppwriteServices/AppwriteQueueMeta'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

function AdminPage(){
    const [tokens, setTokens]= useState([])
    const [meta, setMeta] = useState(null);

    const fetchData = async()=>{
        const tokenRes= await AppwriteTokensService.getAllTokens();
        const metaRes= await AppwriteQueueMetaService.getQueueMeta();

        setTokens(tokenRes.documents);
        setMeta(metaRes);
    };

    useEffect(()=>{
        fetchData();
    },[])

    const currentToken= tokens.find((token)=>token.status==="current");
    const waitingToken= tokens.filter((token)=>token.status==="waiting").sort((a,b)=> a.tokenNumber-b.tokenNumber);
    const completedToken= tokens.filter((token)=>token.status==="completed");

    const waitingCount= waitingToken.length;
    const servedCount= completedToken.length;

    const handleCallNext=async()=>{
        try{
            if(currentToken){
                await AppwriteTokensService.updateTokenStatus(
                    currentToken.$id,
                    "completed"
                )
            }

            if(waitingToken.length>0){
                const next= waitingToken[0];
                
                await AppwriteTokensService.updateTokenStatus(
                    next.$id,
                    "current"
                )

                await AppwriteQueueMetaService.updateCurrentToken({
                    docID: meta.$id,
                    newTokenNumber: next.tokenNumber
                }
                )
            }
            fetchData();
        }
        catch(error){
            console.log("CallNext error :: ",error);
        }
    }

    const handleReset=async()=>{
        try{
            await AppwriteQueueMetaService.resetQueue({docID:meta.$id});

            for(let token of tokens){
                await AppwriteTokensService.updateTokenStatus(token.$id, "waiting");
            }
            fetchData();
        }
        catch(error){
            console.log("Reset Error :: ", error);
        }
    }

    return(
        <>
        <div className={styles.AdminPage}>
            <AdminHeader
                handleReset={handleReset}
                handleCallNext={handleCallNext}
            />

            <div className={styles.activityContainer}>
                <div className={styles.currentStatus}>
                    
                    <CurrentToken
                        token={currentToken}
                        handleCallNext={handleCallNext} 
                    />

                    <div className={styles.activityCards}>
                        <AdminStatsCard
                            icon={<FontAwesomeIcon icon={faUsers}/>}
                            title="TOTAL WAITING"
                            value={waitingCount}
                            variant="waiting"
                        />
                        <AdminStatsCard
                            icon={<FontAwesomeIcon icon={faCircleCheck}/>}
                            title="TOTAL SERVED"
                            value={servedCount}
                            variant="served"
                        />
                    </div>
                </div>
                <ActivityLog tokens={tokens}/>
            </div>

        </div>
        </>
    )

}

export default AdminPage;