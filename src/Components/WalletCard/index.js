import React, { useState } from "react";
import Modal from "react-modal";
import "./walletCard.css";

const WalletCard = ({ text, btn_text, transactionType }) => {
    const [amount, setAmount] = useState(5000);
    const [showModal, setShowModal] = useState(false);
    const [newAmount, setNewAmount] = useState(0);

    const handleExpenses = () => {
        setShowModal(true);
    };

    const handleAddMoney = () => {
        setAmount(prevAmount => prevAmount + newAmount);
        setShowModal(false);
        setNewAmount(0); // Reset the newAmount state
    };

    const handleCancel = () => {
        setShowModal(false);
        setNewAmount(0); // Reset the newAmount state
    };

    return (
        <div className="wallet-card">
            <div className="wallet-card-text">{text}: <span className={`${transactionType}`}>₹{amount}</span></div>
            <button id={`${transactionType}`} className="add-btn" onClick={handleExpenses}>+ {btn_text}</button>

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Add Money Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div>
                    <h2>Add Balance</h2>
                    <div className="add-balance">
                        <input onChange={(e) => setNewAmount(parseInt(e.target.value))} className="enter-value" placeholder="Income Amount"/>
                        <div className="add-cancel-btns">
                            <button className="add-balance-btn" onClick={handleAddMoney}>Okay</button>
                            <button className="close-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default WalletCard;
