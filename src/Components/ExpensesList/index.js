import React, { useEffect, useState } from "react";
import "./expensesList.css";
import ExpensesListItem from "../ExpenseListItem";
import Pagination from "../Pagination";
import ExpensesBarChart from '../ExpensesBarChart';
const ExpensesList = ({ expensesList, setExpensesList,categoriesData, setWalletBalance }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [currentItems, setCurrentItems] = useState([]);
    
    useEffect(() => {
        expensesList.sort(compareDates);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentList = expensesList.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(currentList);
    }, [currentPage, itemsPerPage, expensesList]);

    const totalPages = Math.ceil(expensesList.length / itemsPerPage);

    const compareDates = (a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateA - dateB;
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>
            <div className="expense-list-heading">Recent Transactions</div>
            <div className="expneses-transaction-topList">
                <div className="expenses-list">
                    {expensesList.length === 0 ? (
                        <div className="transaction-message">No Transactions</div>
                    ) : (
                        <>
                            {currentItems.map((expense, index) => {
                                let imgType = "";
                                if (expense.category === "Food") {
                                    imgType = "food.png";
                                } else if (expense.category === "Entertainment") {
                                    imgType = "entertainment.png";
                                } else if (expense.category === "Travel") {
                                    imgType = "travel.png";
                                }
                                const globalIndex = (currentPage - 1) * itemsPerPage + index;
                                return(
                                <div key={index}>
                                    <ExpensesListItem 
                                        imgType = {imgType} 
                                        index = {globalIndex}
                                        expense = {expense}
                                        expensesList = {expensesList}
                                        setExpensesList = {setExpensesList}
                                        setWalletBalance = {setWalletBalance}
                                    />
                                </div>
                                )
                            })}
                            <Pagination
                                currentPage = {currentPage}
                                paginate = {paginate}
                                totalPages = {totalPages}
                            />
                        </>
                    )}
                </div>
                <ExpensesBarChart categoriesData={categoriesData}/>
            </div>
        </div>
    );
};

export default ExpensesList;
