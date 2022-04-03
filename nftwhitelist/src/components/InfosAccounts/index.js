import React from 'react';
const InfosAccounts = (props) => {
  /* on récupère ces var' par le bias de props */
  return (
    <div>
      {!props.loader &&
        props.accounts.length > 0 ?
        <div> 
          <p> You are connected on this account: {props.accounts[0]} </p>
          {props.balance && <p> You have : {props.balance} Eth on your account. </p>}
          {props.balance < .01 && <p className="info-name"> You don't have enough eth on your account to go on our whitelist </p>}
        </div>
            :
          <p> You are not connected with Metamask to this website. </p>
      }
    </div>
  )
}

export default InfosAccounts;