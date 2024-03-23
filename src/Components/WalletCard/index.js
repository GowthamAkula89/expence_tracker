import React, { useState } from "react";
import "./walletCard.css"
const WalletCard = ({text, btn_text, transactionType}) => {
    const[amount, setAmount] = useState(5000);
    return(
        <div className="wallet-card">
            <div className="wallet-card-text">{text}: <span className={`${transactionType}`}>₹{amount}</span></div>
            <button id={`${transactionType}`} className="add-btn">+ {btn_text}</button>
        </div>
    )
}
export default WalletCard;