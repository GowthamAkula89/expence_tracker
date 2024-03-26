import React, { useEffect, useState} from "react";
import "./expensesList.css";

const ExpensesList = ({ expensesList,setExpensesList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [currentItems,setCurrentItems] = useState([]);
    useEffect(() => {
        expensesList.sort(compareDates);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentList = expensesList.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(currentList)
    },[currentPage,itemsPerPage,expensesList])
    const totalPages = Math.ceil(expensesList.length / itemsPerPage);

    const compareDates = (a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateA - dateB;
    };

    const handleDelete = (index) => {
        const updatedExpenses = [...expensesList];
        updatedExpenses.splice(index, 1);
        setExpensesList(updatedExpenses);
    };

    const handleEdit = () => {
        // Implement edit functionality here
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="expense-list-heading">Recent Transactions</div>
            <div className="expenses-list">
                {currentItems.map((expense, index) => {
                    let imgType = "";
                    if (expense.category === "Food") {
                        imgType = "food.png";
                    } else if (expense.category === "Entertainment") {
                        imgType = "entertainment.png";
                    } else if (expense.category === "Travel") {
                        imgType = "travel.png";
                    }
                    return (
                        <div key={index}>
                            <div className="list-item">
                                <div className="list-item-content">
                                    <img src={imgType} alt={expense.category} className="expense-type"/>
                                    <div className="item-sub-content">
                                        <div className="expense-title">{expense.title}</div>
                                        <div className="expense-date">{expense.date}</div>
                                    </div>
                                </div>
                                <div className="list-price-btns">
                                    <div className="expense-price">₹{expense.price}</div>
                                    <div className="list-btns">
                                        <img onClick={() => handleDelete(index)} src="cancel.png" alt="cancel-btn"/>
                                        <img onClick={handleEdit} src="edit.png" alt="edit-btn"/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    );
                })}
                <div className="pagination">
                    <button className="navigate-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        <img src="backward.png" alt="backward" className="navigate-position"></img>
                    </button>
                    <div>{currentPage}</div>
                    <button className="navigate-btn" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                        <img src="forward.png" alt="forward" className="navigate-position"></img>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpensesList;
