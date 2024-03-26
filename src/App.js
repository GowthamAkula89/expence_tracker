import React, { useEffect, useState } from 'react';
import './App.css';
import WalletCard from './Components/WalletCard';
import ExpensesList from './Components/ExpensesList';
function App() {
  const [expensesList, setExpensesList] = useState([
    { title: 'Treaking', price: 45, category: 'Entertainment', date: '25/08/2023' },
    { title: '12th fail', price: 154, category: 'Movie', date: '25/02/2024' },
    { title: 'Biryani', price: 254, category: 'Food', date: '26/02/2024' }
  ]);
  const[totalExpenses, setTotalExpenses] = useState(0);
  // Function to compare dates for sorting
  const compareDates = (a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));
    return dateA - dateB;
  };
  useEffect(()=>{
    const totalExpensesValue = expensesList.reduce((total, expense) => total + expense.price, 0);
    setTotalExpenses(totalExpensesValue);
  },[expensesList])
  console.log(expensesList)
  return (
    <div className="App">
      <div className='heading'>Expense Tracker</div>
      <div className='tracker-head-section'>
        <div className='wallet-section'>
          <WalletCard 
              text = "Wallet Balance" 
              btn_text = "Add Income" 
              transactionType = "addingAmount" 
              value = {5000}/>
          <WalletCard 
              text = "Expenses" 
              btn_text = "Add Expense" 
              transactionType = "expenseAmount" 
              value = {parseInt(totalExpenses)} 
              setExpensesList={setExpensesList}/>
        </div>
      </div>
      <div>
        <div className="expense-list-heading">Recent Transactions</div>
          <div className='expenses-list'>
            {expensesList.sort(compareDates).map((expense, index) => (
                        <div key={index}>
                            <ExpensesList expense={expense}/>
                        </div>
            ))}
          </div>
          
      </div>
    </div>
  );
}
export default App;