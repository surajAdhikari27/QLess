import React from 'react'
import styles from './TokenCard.module.css'

const TokenCard= ({token, type})=>{
  let style= "";
  if(type=="current"){
    style= styles.current;
  }
  else if(type=="next"){
    style= styles.next;
  }
  else if(type=="completed"){
    style= styles.completed;
  }

  return(
    <>
    <div className={`${styles.card} ${style}`}>
      <h3>#{token.tokenNumber}</h3>
      <p>{token.name}</p>

      {type === "next" && (
        <span className={styles.badge}>NEXT</span>
      )}
    </div>
    </>
  )
}

export default TokenCard;

