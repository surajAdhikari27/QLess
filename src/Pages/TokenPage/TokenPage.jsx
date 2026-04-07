import React,{useState} from 'react';
import styles from './TokenPage.module.css'
import AppwriteQueueMetaService from '../../AppwriteServices/AppwriteQueueMeta'
import AppwriteTokensService from '../../AppwriteServices/AppwriteTokens'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'


function TokenPage(){

    const [name, setName]= useState("")
    const [token, setToken]= useState(null)
    const [loading, setLoading]= useState(false)

    const handleGenerateToken= async(e)=>{
        e.preventDefault();
        try{
            setLoading(true)
            const meta= await AppwriteQueueMetaService.getQueueMeta()

            const newTokenNumber= meta.lastToken+1;

            const createToken= await AppwriteTokensService.createToken({
                name,
                tokenNumber: newTokenNumber
            })

            await AppwriteQueueMetaService.incrementTokenNumber(
                {
                    docID: meta.$id,
                    lastTokenNumber: meta.lastToken
                }
            )

            setToken({
                ...createToken,
                currentToken: meta.currentToken,
            });
        }
        catch(error){
            console.log("Token generation error :: ",error);
        }
        finally{
            setLoading(false);
        }
    }
    
    return(
        <>
        <div className={styles.tokenPage}>
            {!token ? (
                <div className={styles.card}>
                    <h2>Join the Queue</h2>
                    <p>Enter your name to generate a virtual token.</p>

                    <div className={styles.inputField}>
                        <p>Your Name</p>
                        <input
                            type="text"
                            placeholder="Enter your name here"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>

                    <button onClick={handleGenerateToken}>
                        {loading ? "Generating..." : "Generate Token"}
                    </button>
                </div>
            ) : (
                <div className={styles.tokenCard}>
                    <h4>YOUR TOKEN</h4>

                    <div className={styles.tokenDetails}>
                        <h1>#{token.tokenNumber}</h1>
                        <h3>{name}</h3>
                    </div>

                    <div className={styles.waitingDetails}>
                        <div className={styles.waitTime}>
                            <FontAwesomeIcon icon={faClock}/>
                            <p>Est. Wait Time</p>
                            <h3>~{(token.tokenNumber - token.currentToken) * 2} min</h3>
                        </div>

                        <div className={styles.currentlyServing}>
                            <p>Currently Serving</p>
                            <h3>{token.currentToken || "--"}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default TokenPage;