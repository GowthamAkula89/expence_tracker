import React, {useState} from "react";
import "./expenseListItem.css";
const ExpensesListItem = ({imgType, index, expensesList, setExpensesList,  expense, setWalletBalance}) => {
    const [editIndex, setEditIndex] = useState(-1);
    const [editedItem, setEditedItem] = useState({});
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedItem(expensesList[index]);
    };
    const handleSaveEdit = () => {
        const updatedExpenses = [...expensesList];
        updatedExpenses[editIndex] = editedItem;
        setExpensesList(updatedExpenses);
        setEditIndex(-1);
    };
    const handleCancelEdit = () => {
        setEditIndex(-1);
    };
    const handleDelete = (index) => {
        const deletedExpense = expensesList[index];
        setWalletBalance(prevBalance => prevBalance + deletedExpense.price);
        const updatedExpenses = [...expensesList];
        updatedExpenses.splice(index, 1);
        setExpensesList(updatedExpenses);
    };
    return (
        <>
            <div className="list-item">
                {editIndex === index ? (
                    <>
                        <div className="list-item-content">
                            <img src={imgType} alt={expense.category} className="expense-type" />
                            <div className="item-sub-content">
                                <input
                                    type="text"
                                    value={editedItem.title}
                                    onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editedItem.price}
                                    onChange={(e) => setEditedItem({ ...editedItem, price: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="list-price-btns">
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="list-item-content">
                            <img src={imgType} alt={expense.category} className="expense-type" />
                            <div className="item-sub-content">
                                <div className="expense-title">{expense.title}</div>
                                <div className="expense-date">{expense.date}</div>
                            </div>
                        </div>
                        <div className="list-price-btns">
                            <div className="expense-price">₹{expense.price}</div>
                            <div className="list-btns">
                                <img onClick={() => handleDelete(index)} src="cancel.png" alt="cancel-btn" />
                                <img onClick={() => handleEdit(index)} src="edit.png" alt="edit-btn" />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <hr />
        </>
    );
}
export default ExpensesListItem;