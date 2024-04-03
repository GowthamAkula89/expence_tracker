import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSnackbar } from 'notistack';
import "./walletCard.css";
const WalletCard = ({ text, btn_text, transactionType,value, setExpensesList, setWalletBalance }) => {
    const [amount, setAmount] = useState(value);
    const [showModal, setShowModal] = useState(false);
    const [newAmount, setNewAmount] = useState({ title: "", price: 0, category: "", date: "" });
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setAmount(value);
    }, [value]);
    const handleExpenses = () => {
        setShowModal(true);
    };
    const handleAddMoney = () => {
        if (transactionType === "addingAmount") {
            setWalletBalance(prevAmount => prevAmount + newAmount.price);
        } else if (transactionType === "expenseAmount") {
            if (newAmount.price > amount) {
                enqueueSnackbar('Expense price exceeds wallet amount!', { variant: 'error' });
                return;
            }
            setWalletBalance(prevAmount => prevAmount - newAmount.price);
            const expense = { ...newAmount };
            setExpensesList(prevList => [...prevList, expense]);
        }
        setShowModal(false);
        setNewAmount({ title: "", price: 0, category: "", date: "" });
    };

    const handleCancel = () => {
        setShowModal(false);
        setNewAmount({ title: "", price: 0, category: "", date: "" });
    };

    
    return (
        <div className="wallet-card">
            <div className="wallet-card-text">{text}: <span className={`${transactionType}`}>₹{amount}</span></div>
            <button id={`${transactionType}`} className="add-btn" onClick={handleExpenses}>+ {btn_text}</button>

            {transactionType === "addingAmount" &&
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Add Money Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div>
                    <h2 className="card-title">Add Balance</h2>
                    <div className="add-balance">
                        <input onChange={(e) => setNewAmount(prevState => ({...prevState, price: parseInt(e.target.value)}))} className="enter-value" placeholder="     Income Amount"/>
                        <div className="add-cancel-btns">
                            <button className="add-balance-btn" onClick={handleAddMoney}>Add Balance</button>
                            <button className="close-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
            }
            {/* Expenses */}
            {transactionType === "expenseAmount" &&
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Add Money Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div>
                    <div className="card-title">Add Expenses</div>
                    <div className="expense-amount-card">
                        <div className="expense-details-field">
                            <input onChange={(e) => setNewAmount(prevState => ({...prevState, title: e.target.value}))} className="enter-value" placeholder=" Title"/>
                            <input onChange={(e) => setNewAmount(prevState => ({...prevState, price: parseInt(e.target.value)}))} className="enter-value" placeholder=" Price"/>
                        </div>
                        <div className="expense-details-field">
                            <select onChange={(e) => setNewAmount(prevState => ({...prevState, category: e.target.value}))} className="enter-value">
                                <option value="">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Travel">Travel</option>
                            </select>
                            <input onChange={(e) => setNewAmount(prevState => ({...prevState, date: e.target.value}))} className="enter-value" placeholder=" dd/mm/yyyy"/>
                        </div>
                        <div className="add-cancel-btns">
                            <button className="add-balance-btn" onClick={handleAddMoney}>Add Expense</button>
                            <button className="close-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
            }
        </div>
    );
};
export default WalletCard;
